#!/bin/bash


# Import .env file | @JeffreyC (Read environment file from only one source as best practice)
if [ -f ../.env ]
then
  export $(cat ../.env | sed 's/#.*//g' | xargs)
else
  echo "cannot find .env file - please check the path to the file."
fi

export PGPASSWORD=${CONFIGMAP_DATABASE_PASSWORD_KEY}

echo "Configuring database: ${CONFIGMAP_DATABASE_NAME_KEY}"

pg_hostname="-h $CONFIGMAP_DATABASE_HOST_KEY -p ${CONFIGMAP_DATABASE_PORT_KEY} -U $CONFIGMAP_DATABASE_USER_KEY"

echo "Drop skills database if it exists"
dropdb $pg_hostname $CONFIGMAP_DATABASE_NAME_KEY

echo "Create skills database"
createdb $pg_hostname $CONFIGMAP_DATABASE_NAME_KEY

echo "Seed database with data"
psql $pg_hostname $CONFIGMAP_DATABASE_NAME_KEY < ./bin/sql/seed_skills.sql

echo "Finished configuring database: $CONFIGMAP_DATABASE_NAME_KEY"

psql $pg_hostname -v ON_ERROR_STOP=1  <<EOF
create extension pg_trgm;
create extension fuzzystrmatch;
select * FROM pg_extension;
EOF