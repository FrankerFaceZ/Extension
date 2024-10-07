FrankerFaceZ Build Script
=========================

Copyright (c) 2024 Dan Salvato LLC

Licensed under the Apache License, Version 2.0. See LICENSE.


The build process is intended to be performed using CI via GitHub Actions.
However, the individual steps can be performed manually should you wish.


Requirements
============
* node 18+
* pnpm 8+
* git


How to Build
============
1. Ensure you have the requirements installed on your machine.
2. Ensure you're working with a clean copy of the source.
   If you are working with a source archive, you should already have the
   relevant files downloaded into the `client` and `addons` folders. If
   you don't have those, run the following `git` commands to download the
   latest code from those repositories:
   ```bash
   git clone https://github.com/FrankerFaceZ/FrankerFaceZ.git client
   git clone https://github.com/FrankerFaceZ/Add-Ons.git addons
   ```
3. Load the environment variables with the calculated version. If you
   had to clone the repositories with git, you'll need to run the script
   to calculate them instead.

   If you downloaded a source archive, run this command:
   ```bash
   source ffz_env
   ```

   If you had to clone the repositories, run this command:
   ```bash
   chmod +x scripts/calculate-version.sh
   ./scripts/calculate-version.sh
   ```
4. Build the main client.
   ```bash
   cd client
   pnpm install
   FFZ_EXTENSION=true pnpm build
   cd ..
   ```
5. Build the add-ons.
   ```bash
   cd addons
   pnpm install
   FFZ_EXTENSION=true pnpm build
   cd ..
   ```
5. Ensure you don't have a `dist` folder. Delete it if you do with:
   ```bash
   rm -rf dist
   ```
6. Copy the build output from steps 4 and 5 into the dist folder:
   ```bash
   chmod +x scripts/copy-output.sh
   ./scripts/copy-output.sh
   ```
7. Update the version in the manifest.
   ```bash
   node scripts/update-manifest.js
   ```
8. Find the unpacked extension in the `dist` folder.
9. Optionally, zip the contents of the `dist` as suits your needs.
