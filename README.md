FrankerFaceZ Build Script
=========================

Copyright (c) 2023 Dan Salvato LLC

Licensed under the Apache License, Version 2.0. See LICENSE.


Building
========

This script is still under development, and may be unstable in its current
form. This script performs the following actions:

1. Runs `git pull` in the `client` sub-module.
2. Runs `get pull` in the `addons` sub-module.
3. Runs `pnpm install`, `pnpm clean`, and `pnpm build` in the `client` sub-module.
4. Runs `pnpm install`, `pnpm clean`, and `pnpm build` in the `addons` sub-module.
5. Removes the `dist` folder, if one already exists.
6. Copies output from the `client` and `addons` build processes into the `dist/web` folder.
7. Copies the contents of the `src` folder into the `dist` folder.
8. Determines the correct build version by examining the version of the `client` sub-module.
9. Sets the version in the manifest in the `dist` folder.

In the future, this script will be expanded to build both Firefox and Chrome extensions.
It will also be updated to automatically submit builds.

Currently, it just produces a loose folder.


Requirements
============
* node v18 (not tested on other node versions yet)
* pnpm v8 (not tested with other pnpm versions yet)
* git

How to Use
==========
1. Ensure you have the requirements installed on your machine.
2. Ensure the `addons` and `client` git sub-modules have been populated.
3. Run the command `pnpm install` to ensure you have dependencies installed for this tool.
4. Run the command `pnpm build` to run the build script.
5. Find the results in the `dist` folder.
