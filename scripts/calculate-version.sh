#!/bin/bash

# Function to check if a directory is a valid git repository
check_git_repo() {
    local dir="$1"
    if [ ! -d "$dir" ]; then
        echo "Error: The directory '$dir' does not exist. Please follow the instructions in README to set up the working sources."
        exit 1
    fi
    if ! git -C "$dir" rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        echo "The directory '$dir' does not contain a valid git repository. You likely didn't need to run this command."
        exit 1
    fi
}

# Check to make sure we have git repos.
check_git_repo "client"
check_git_repo "addons"

# Get the version of the main client.
cd client
VERSION=$(node -p "require('./package.json').version")
CLIENT_COMMIT=$(git rev-parse HEAD)
LAST_MODIFIED=$(git log -1 --pretty=format:%ct -- package.json)
CLIENT_MESSAGE=$(git log -1 --pretty=format:%B -- package.json)
cd ..

# Get the version of the add-ons.
cd addons
ADDONS_COMMIT=$(git rev-parse HEAD)
BUILD=$(git rev-list --count --since=@$LAST_MODIFIED HEAD)
ADDONS_LAST=$(git log -1 --pretty=format:%ct)
ADDONS_MESSAGE=$(git log -1 --pretty=format:%B)
cd ..

# Determine which commit message is most recent
if [ "$LAST_MODIFIED" -gt "$ADDONS_LAST" ]; then
    LATEST_MESSAGE="$CLIENT_MESSAGE"
else
    LATEST_MESSAGE="$ADDONS_MESSAGE"
fi

# Log the results
echo "Main Client Version: $VERSION"
echo "Commit: $CLIENT_COMMIT"
echo "Modified: $LAST_MODIFIED"
echo ""
echo "Build Version: $BUILD"
echo "Commit: $ADDONS_COMMIT"
echo ""
echo "Latest Commit Message:"
echo "$LATEST_MESSAGE"

# Export our environmental variables
echo "CLIENT_COMMIT=$CLIENT_COMMIT" >> .env
echo "FFZ_VERSION=$VERSION" >> .env
echo "ADDONS_COMMIT=$ADDONS_COMMIT" >> .env
echo "FFZ_BUILD=$BUILD" >> .env
echo 'LATEST_MESSAGE<<__EOCMHERE__' >> .env
echo "$LATEST_MESSAGE" >> .env
echo "__EOCMHERE__" >> .env

# Export our environmental variables (for the source archive)
echo "export CLIENT_COMMIT=$CLIENT_COMMIT" >> ffz_env
echo "export FFZ_VERSION=$VERSION" >> ffz_env
echo "export ADDONS_COMMIT=$ADDONS_COMMIT" >> ffz_env
echo "export FFZ_BUILD=$BUILD" >> ffz_env
printf 'export LATEST_MESSAGE="%s"\n' "$(echo "$LATEST_MESSAGE" | sed 's/"/\\"/g')" >> ffz_env
