#!/bin/bash

 
#-----------------------------------------------------------------------------
#         DELETE THE POSTGRESQL INSTANCE ON REDHAT OPENSHIFT CLUSTER
#-----------------------------------------------------------------------------

exec 3>&1

# Variable definition
function define(){
 NAMESPACE="<SUPLY DATA HERE>"
}

# Cleanup
function cleanup(){
    while true; do
        read -p "Do you wish to cleanup which is delete everything in the $NAMESPACE project? [y|n] " yn
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) exit;;
            * ) echo "Please answer yes or no.";;
        esac
    done

    oc delete project $NAMESPACE
    echo Cleaned up $NAMESPACE project.
}
#######
define
cleanup
########

