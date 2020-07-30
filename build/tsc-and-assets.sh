#!/usr/bin/env bash

BASE_DIR=$(cd "$(dirname "$0")";pwd)
ROOT_DIR=${BASE_DIR%/*}
output=${ROOT_DIR}/dist
watch=$1

echo '--------\n'
echo $ROOT_DIR
echo $watch
echo '\n--------'

cd $ROOT_DIR

if [ -d $output ]; then
  rm -fr $output
fi

mkdir $output
cp -r src/assets $output/

if [ ! -d $output/_utils ]; then
  mkdir -p $output/_utils
fi

# cp src/_utils/accounting.js $output/_utils/accounting.js

if [ "$watch" == "--watch" ]; then
  $ROOT_DIR/node_modules/typescript/bin/tsc -p ./tsconfig.json $watch
else
  $ROOT_DIR/node_modules/typescript/bin/tsc -p ./tsconfig.build.json
fi
