# TestFairy Unity Asset Packager

This is a tool we use to package the TestFairy Unity Plugin. 

Unity can import `unitypackage` files as long as they're zipped up in a specific way. This utility is used to package up our Unity plugin. It has one rather large assumption, which is its trying to package a directory which already has a `.meta` file at the same level of files. These `.meta` files are created by Unity.

## Installation

```
npm install -g testfairy-unity-asset-packager
```

## Usage

```
Usage: index [options] <directory>

Options:
  -o, --output <output filename>  The output package name (default: "Assets.unitypackage")
  --overwrite                     Overwrite output file if exists (default: false)
  -x, --exclude <filter>          Exclude files/folders using comma separated string (uses .gitignore spec)
  -p, --prepend <directory>       Prepend directory to 'pathname' in asset package
  -d, --debug                     Debug script (default: false)
  -h, --help                      output usage information
```

```
testfairy-unity-asset-packager --output TestFairySDK-Unity.unitypackage "/<project root directory>/Assets/"
```	

If you have an `Asset` directory that looks as follows: 

```
.
└── Assets
    ├── Plugins
    │   ├── Android
    │   │   ├── testafairy-android-sdk.aar
    │   │   └── testafairy-android-sdk.aar.meta
    │   ├── Android.meta
    │   ├── TestFairy.cs
    │   ├── TestFairy.cs.meta
    │   ├── iOS
    │   │   ├── TestFairy.framework
    │   │   │   ├── Headers
    │   │   │   │   ├── TestFairy.h
    │   │   │   │   └── TestFairy.h.meta
    │   │   │   ├── Headers.meta
    │   │   │   ├── Info.plist
    │   │   │   ├── Info.plist.meta
    │   │   │   ├── Modules
    │   │   │   │   ├── module.modulemap
    │   │   │   │   └── module.modulemap.meta
    │   │   │   ├── Modules.meta
    │   │   │   ├── TestFairy
    │   │   │   ├── TestFairy.meta
    │   │   │   ├── upload-dsym.sh
    │   │   │   └── upload-dsym.sh.meta
    │   │   ├── TestFairy.framework.meta
    │   │   ├── TestFairyUnityWrapper.h
    │   │   ├── TestFairyUnityWrapper.h.meta
    │   │   ├── TestFairyUnityWrapper.m
    │   │   └── TestFairyUnityWrapper.m.meta
    │   └── iOS.meta
    ├── Plugins.meta
    ├── Scenes
    │   ├── SampleScene.unity
    │   └── SampleScene.unity.meta
    ├── Scenes.meta
    ├── mainCamera.cs
    └── mainCamera.cs.meta
```

and you run the following command

```
node index.js --exclude 'Scenes*,mainCamera.cs*' --output testfairy.unitypackage "/tmp/"
```

This will generate a package with the following content:

```
-rw-r--r-- 501/20          172 2019-09-10 08:11 0906f4c19cd164ff99261f4ca645a9b9/asset.meta
-rw-r--r-- 501/20           22 2019-09-10 08:11 0906f4c19cd164ff99261f4ca645a9b9/pathname
-rw-r--r-- 501/20          172 2019-09-10 08:11 14176102431a849e18f38f6d98e51fb3/asset.meta
-rw-r--r-- 501/20           14 2019-09-10 08:11 14176102431a849e18f38f6d98e51fb3/pathname
-rw-r--r-- 501/20          710 2019-09-10 08:11 1e12d30eb73ae4d8087fa3e0492c56bf/asset
-rw-r--r-- 501/20          155 2019-09-10 08:11 1e12d30eb73ae4d8087fa3e0492c56bf/asset.meta
-rw-r--r-- 501/20           49 2019-09-10 08:11 1e12d30eb73ae4d8087fa3e0492c56bf/pathname
-rw-r--r-- 501/20          172 2019-09-10 08:11 3d97a0793d001497293250dbd4ef747a/asset.meta
-rw-r--r-- 501/20           18 2019-09-10 08:11 3d97a0793d001497293250dbd4ef747a/pathname
-rwxr-xr-x 501/20         5010 2019-09-10 08:11 48335fd1d2d3745a7a6189eeff3240a4/asset
-rw-r--r-- 501/20          637 2019-09-10 08:11 48335fd1d2d3745a7a6189eeff3240a4/asset.meta
-rw-r--r-- 501/20           42 2019-09-10 08:11 48335fd1d2d3745a7a6189eeff3240a4/pathname
-rw-r--r-- 501/20          172 2019-09-10 08:11 56b7b61a2d6c94150a797362cc38ce88/asset.meta
-rw-r--r-- 501/20           46 2019-09-10 08:11 56b7b61a2d6c94150a797362cc38ce88/pathname
-rwxr-xr-x 501/20     19838176 2019-09-10 08:11 5c7ef8e4fa70249018d36473c0370f1f/asset
-rw-r--r-- 501/20          155 2019-09-10 08:11 5c7ef8e4fa70249018d36473c0370f1f/asset.meta
-rw-r--r-- 501/20           48 2019-09-10 08:11 5c7ef8e4fa70249018d36473c0370f1f/pathname
-rw-r--r-- 501/20         2065 2019-09-10 08:11 6eeed46000b5d45f28ed481053bfd376/asset
-rw-r--r-- 501/20          155 2019-09-10 08:11 6eeed46000b5d45f28ed481053bfd376/asset.meta
-rw-r--r-- 501/20           53 2019-09-10 08:11 6eeed46000b5d45f28ed481053bfd376/pathname
-rw-r--r-- 501/20          172 2019-09-10 08:11 7d376a57cd68e4386980a99f058751f5/asset.meta
-rw-r--r-- 501/20           46 2019-09-10 08:11 7d376a57cd68e4386980a99f058751f5/pathname
-rwxr-xr-x 501/20           48 2019-09-10 08:11 8230540a70ee94c219a67b698b325e7b/asset
-rw-r--r-- 501/20          637 2019-09-10 08:11 8230540a70ee94c219a67b698b325e7b/asset.meta
-rw-r--r-- 501/20           42 2019-09-10 08:11 8230540a70ee94c219a67b698b325e7b/pathname
-rw-r--r-- 501/20           99 2019-09-10 08:11 8524c80cb6bca4114afc6267673b50a2/asset
-rw-r--r-- 501/20          155 2019-09-10 08:11 8524c80cb6bca4114afc6267673b50a2/asset.meta
-rw-r--r-- 501/20           63 2019-09-10 08:11 8524c80cb6bca4114afc6267673b50a2/pathname
-rw-r--r-- 501/20        11254 2019-09-10 08:11 8c1f4a87870c048db9eea41e77763b36/asset
-rw-r--r-- 501/20          243 2019-09-10 08:11 8c1f4a87870c048db9eea41e77763b36/asset.meta
-rw-r--r-- 501/20           27 2019-09-10 08:11 8c1f4a87870c048db9eea41e77763b36/pathname
-rw-r--r-- 501/20       329622 2019-09-10 08:11 92e2c0e49ee054cf6b415b80804cf107/asset
-rw-r--r-- 501/20          608 2019-09-10 08:11 92e2c0e49ee054cf6b415b80804cf107/asset.meta
-rw-r--r-- 501/20           48 2019-09-10 08:11 92e2c0e49ee054cf6b415b80804cf107/pathname
-rw-r--r-- 501/20          653 2019-09-10 08:11 c94062d32be0142509d29f8323a35244/asset.meta
-rw-r--r-- 501/20           38 2019-09-10 08:11 c94062d32be0142509d29f8323a35244/pathname
-rw-r--r-- 501/20        15261 2019-09-10 08:11 caa149affa2ac497bb3b51d865bb04b5/asset
-rw-r--r-- 501/20          155 2019-09-10 08:11 caa149affa2ac497bb3b51d865bb04b5/asset.meta
-rw-r--r-- 501/20           58 2019-09-10 08:11 caa149affa2ac497bb3b51d865bb04b5/pathname
```