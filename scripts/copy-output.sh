#!/bin/bash -e

# Copy build output
mkdir -p dist/web

cp -r client/dist/* dist/web/
cp -r addons/dist/* dist/web/
cp -rf src/* dist/

# Remove some files that we don't want to include
# in our packaged extensions.
rm -rf dist/web/bom
rm -rf dist/web/addons-bom
rm dist/web/manifest.json
rm dist/web/addons/manifest.json

# Find the addons.*.json file and rename it.
shopt -s nocasematch
for file in dist/web/*; do
  if [[ "$(basename "$file")" =~ ^addons\.[a-z0-9]+\.json$ ]]; then
    mv "$file" dist/web/addons.json
    break
  fi
done
shopt -u nocasematch
