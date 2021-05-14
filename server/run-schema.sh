#!/bin/bash

echo DIR $DIR
echo "TEST"
DATABASE_URL="postgres://postgres:postgres@localhost/app_public"
psql -q -v ON_ERROR_STOP=1 -f schema.sql $DATABASE_URL
if [ $? -ne 0 ]; then
    echo "Error"
    exit 1
fi
echo "========= Database created ========="
