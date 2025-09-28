#!/bin/sh

# build.sh -- Run helper scripts and build the project

dir="$(dirname "$0")"

set -xe

node "$dir/init.ts"
node "$dir/genindexes.ts" --pre
next build
node "$dir/genindexes.ts" --post