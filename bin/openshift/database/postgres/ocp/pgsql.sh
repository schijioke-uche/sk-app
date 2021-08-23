#!/bin/bash

 
#-------------------------------------------------------------------------------
#              INSTALL POSTGRESQL INSTANCE ON REDHAT OPENSHIFT CLUSTER
#-----------------------------------------------------------------------------

exec 3>&1

function _out() {
  echo "$(date +'%F %H:%M:%S') $@"
}

# ENV Variable definition
function define(){
 NAMESPACE=""
 APP_NAME=""
 USER=""
 PWD=""
 DATABASE_TYPE=""
}

# Assign Namespace
function namespace(){
   oc project $NAMESPACE
}

# Redhat Openshift Postgres Software
function postgres() {
  oc new-app  --name $APP_NAME\
    -e POSTGRESQL_USER=$USER \
    -e POSTGRESQL_PASSWORD=$PWD\
    -e POSTGRESQL_DATABASE=$DATABASE_TYPE\
    registry.access.redhat.com/rhscl/postgresql-95-rhel7
}

# Deploy the database
function clustered(){
   define
   namespace
   postgres
}


#######
clustered
#######