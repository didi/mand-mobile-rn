#!/usr/bin/env bash

echo '-----------------'
echo 'example: yarn test:single [component-name] [-u]'
echo '-----------------'

echo "\$1: $1"
echo "\$2: $2"

BASE_DIR=$(cd "$(dirname "$0")";pwd)
ROOT_DIR=${BASE_DIR%/*}

componentName=$1
secondArg=$2

componentPath="$ROOT_DIR/src/components/$componentName/__test__/index.spec.tsx"
echo $componentPath

if [ ! -e "$componentPath" ]; then
  echo 'Test file not exists'
  exit 1
fi

./node_modules/jest/bin/jest.js $componentPath $secondArg