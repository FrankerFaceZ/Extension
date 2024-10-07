#!/bin/bash -e

# Copy build output
mkdir -p dist/web

cp -r client/dist/* dist/web/
cp -r addons/dist/* dist/web/
cp -rf src/* dist/

# Find the addons.*.json file and rename it.
shopt -s nocasematch
for file in dist/web/*; do
  if [[ "$(basename "$file")" =~ ^addons\.[a-z0-9]+\.json$ ]]; then
    mv "$file" dist/web/addons.json
    break
  fi
done
shopt -u nocasematch
