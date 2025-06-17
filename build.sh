#!/bin/bash
set -x # echo on

# Load the environment variables
source ffz_env

# Build the main client
cd client
pnpm install --frozen-lockfile
pnpm build:ext
cd ..

# Build the add-ons
cd addons
pnpm install --frozen-lockfile
pnpm build:ext
cd ..

# Remove the dist folder if it exists
rm -rf dist

# Copy the output to the dist folder
chmod +x scripts/copy-output.sh
./scripts/copy-output.sh

# Update the version in the manifest
node scripts/update-manifest.js
