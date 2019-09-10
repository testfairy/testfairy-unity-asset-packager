#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const program = require('commander');
const recursive = require("recursive-readdir");
const targz = require('targz');
const tmp = require('tmp');
const YAML = require('yaml');
const ignore = require('ignore');

let directory = null;

program
 .arguments('<directory>')
 .option('-o, --output <output filename>', 'The output package name', 'Assets.unitypackage')
 .option('--overwrite', 'Overwrite output file if exists', false)
 .option('-x, --exclude <filter>', 'Exclude files/folders using comma separated string (uses .gitignore spec)')
 .option('-p, --prepend <directory>', 'Prepend directory to \'pathname\' in asset package')
 .option('-d, --debug', 'Debug script', false)
 .action(function(dir) {
	directory = dir || ".";
 })
 .parse(process.argv);

 directory = directory || ".";

 let ig = ignore();
if (program.exclude) {
	let exclude = program.exclude;
	ig = ignore().add(exclude.split(',').filter(item => item.trim() !== ''));
}

 let debug = function() {
	if (program.debug) {
		console.log(...arguments);
	}
 }

 if (fs.existsSync(program.output)) {
	if (program.overwrite) {
		fs.unlinkSync(program.output);
	} else {
		console.log(`Output file '${program.output}' exists. Use --overwrite to overwrite existing file.`);
		process.exit(1);
	}
}

let ignoreFunction = function(file, stats) {
	let filePath = path.relative(directory, file);
	let ignored = ig.ignores(filePath);
	if (ignored) {
		debug("Excluding file", file);
	}

	return ignored;
}

 recursive(directory, [ignoreFunction], function (err, files) {
	if (err) {
		console.log("Asset packaging failed", err);
		process.exit(1);
	}

	let onDiskFiles = {};
	files.forEach(file => {
		if (file.endsWith('.meta')) {
			let original = file.substr(0, file.length - 5);
			let currentItems = onDiskFiles[original];
			let items = {...currentItems, meta: file};
			onDiskFiles[original] = items;
		} else {
			let currentItems = onDiskFiles[file];
			let items = {...currentItems, asset: file};
			onDiskFiles[file] = items;
		}
	});
	
	let temp = tmp.dirSync();
	let tempDirectory = temp.name;
	debug(`Working temp directory is ${tempDirectory}.`);

	for (var file in onDiskFiles) {
		let data = onDiskFiles[file];
		if (!data.meta) { 
			debug(`Skipping ${file}. Not .meta file found.`);
			continue;
		}

		const metaFile = fs.readFileSync(data.meta, 'utf8')
		let meta = YAML.parse(metaFile);
		let itemDirectory = path.join(tempDirectory, meta.guid);
		fs.mkdirSync(itemDirectory);

		let fullPath = [];
		if (program.prepend) {
			fullPath.push(program.prepend);
		}
		fullPath.push(path.relative(directory, file));
		let filePath = path.join(...fullPath);
		let pathname = path.join(itemDirectory, 'pathname');
		debug(`Writing ${filePath} to ${pathname}`);
		fs.writeFileSync(pathname, filePath);

		let assetMeta = path.join(itemDirectory, 'asset.meta');
		debug(`Copying '${data.meta}' to ${assetMeta}`);
		fs.copyFileSync(data.meta, assetMeta);
		
		if (data.asset) {
			let asset = path.join(itemDirectory, 'asset');
			debug(`Copying '${data.asset}' to ${assetMeta}`);
			fs.copyFileSync(data.asset, asset);
		}
	}

	targz.compress({src: tempDirectory, dest: program.output}, function(err){
		if(err) {
			console.log("Asset packaging failed", err);
			process.exit(1);
		} else {
			console.log(`Asset package '${program.output}' created successfully.`);
		}
	});
});
 