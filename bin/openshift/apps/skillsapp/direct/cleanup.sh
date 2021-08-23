#!/bin/bash

 
# @Author: Jeffrey Chijioke-Uche.
# @Team: Lauren Konchan Squad (IBM Garage Technology).
# @Company: IBM.
# @Product: IBM Skills App.
# @Usage: Cleanup/Delete deployment
# @Platform: IBM Redhat Openshift Container Platform v4.7+
# @Created: August 2, 2021.
# @Last modified is August 2, 2021. 
#-----------------------------------------------------------------------------
#         DELETE THE SKILL APP ON REDHAT OPENSHIFT CLUSTER
#-----------------------------------------------------------------------------

exec 3>&1

# Variable definition
function define(){
 NAMESPACE="<PROVIDE-HERE>"
}

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

