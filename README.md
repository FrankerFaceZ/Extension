FrankerFaceZ Build Script
=========================

Copyright (c) 2023 Dan Salvato LLC

Licensed under the Apache License, Version 2.0. See LICENSE.


This script was tested and run on a machine with the following software versions:

- Ubuntu 22.04.2 LTS
- Node 18.17.1
- pnpm 8.1.0
- git 2.34.1


Requirements
============
* node 18+
* pnpm 8+
* git


How to Use
==========
1. Ensure you have the requirements installed on your machine.
2. Run the command `pnpm install` to ensure you have dependencies installed for this tool.
3. Optionally, run the command `pnpm clone` to update the `addons` and `client` folders
   with the latest software versions from GitHub. This should not be done when creating
   a build to test against an existing build, as you may receive newer sources and the
   expected output will differ.
4. Run the command `pnpm build` to build and package the extension.
5. Find the unpacked results in the `dist` folder.
6. Optionally zip the contents of the `dist` folder, as suits your needs.


Building
========

This script is still under development, and may be unstable in its current
form. The clone script performs the following actions:

1. Recursively deletes the `client` and `addons` folders, if they exist.
2. Clones the main FrankerFaceZ client repository (https://github.com/FrankerFaceZ/FrankerFaceZ.git)
   into the `client` folder.
3. Clones the add-ons repository (https://github.com/FrankerFaceZ/Add-Ons.git) into
   the `addons` folder.

The build script performs the following actions:

 1. Runs the `pnpm install` command within the `client` folder, with the `CI` environmental
    variable set to true to ensure no dependencies are changed.
 2. Runs the `pnpm clean` command within the `client` folder to ensure no remnants of a
    previous build will contaminate the new build.
 3. Runs the `pnpm build` command within the `client` folder to build the main extension.

 4. Runs the `pnpm install` command within the `addons` folder, with the `CI` environmental
    variable set to true to ensure no dependencies are changed.
 5. Runs the `pnpm clean` command within the `addons` folder to ensure no remnants of a
    previous build will contaminate the new build.
 6. Runs the `pnpm build` command within the `addons` folder to build all the included
    add-ons that ship with the extension.

 7. Recursively deletes the `dist` folder, if it exists.
 8. Copies the built output from steps 3 and 6 into the `dist` folder.
 9. Renames a generated manifest to remove an unnecessary hash.
10. Copies the contents of the `src` folder into the `dist` folder.
11. Edits the extension manifest in `dist/manifest.json` to include a version number
    based on the main extension's version and incrementing for each build.


Please note that consecutive builds will have distinct version numbers due to how the
script automatically increments build numbers, so the built output will differ slightly. 

In the future, this script will be expanded to build both Firefox and Chrome extensions.
It will also be updated to automatically submit builds.

Currently, it just produces a loose folder.
