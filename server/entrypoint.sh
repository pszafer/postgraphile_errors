#!/bin/sh
./run-schema.sh
yarn
exec "$@"