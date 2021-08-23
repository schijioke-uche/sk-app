#!/bin/bash

 
#-------------------------------------------------------------------------------
#              INSTALL POSTGRESQL INSTANCE ON REDHAT OPENSHIFT CLUSTER
#-----------------------------------------------------------------------------

exec 3>&1

function _out() {
  echo "$(date +'%F %H:%M:%S') $@"
}

# Variable definition
function define(){
 NAMESPACE="tools"
 PV_PVC="pv-pvc.yaml"
}


function namespace(){
   oc project $NAMESPACE
}

function volume() {
   oc apply -f ../deploy/volumes/$PV_PVC
}


function clustered(){
   define
   namespace
   volume
}


#######
clustered
#######