#!/bin/bash

# Get the version of the main client.
cd client
VERSION=$(node -p "require('./package.json').version")
CLIENT_COMMIT=$(git rev-parse HEAD)
LAST_MODIFIED=$(git log -1 --pretty=format:%ct -- package.json)
cd ..

# Get the version of the add-ons.
cd addons
ADDONS_COMMIT=$(git rev-parse HEAD)
BUILD=$(git rev-list --count --since=@$LAST_MODIFIED HEAD)
cd ..

# Log the results
echo "Main Client Version: $VERSION"
echo "Commit: $CLIENT_COMMIT"
echo "Modified: $LAST_MODIFIED"
echo ""
echo "Build Version: $BUILD"
echo "Commit: $ADDONS_COMMIT"

# Export our environmental variables
echo "CLIENT_COMMIT=$CLIENT_COMMIT" >> .env
echo "FFZ_VERSION=$VERSION" >> .env
echo "ADDONS_COMMIT=$ADDONS_COMMIT" >> .env
echo "FFZ_BUILD=$BUILD" >> .env
