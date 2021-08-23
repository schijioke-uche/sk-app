#!/bin/bash

#------------------------------------------------------------------------------------
#    CHECK IF YOUR LOCAL TERMINAL IS ELIGIBLE TO DEPLOY POSTGRES ON REDHAT OPENSHIFT
#------------------------------------------------------------------------------------

exec 3>&1

# Date timestamp.
function _out() {
  echo "$(date +'%F %H:%M:%S') $@"
}

# Openshift version verification
function ocVersion(){
   OCV=$(oc version)
}

# Openshift client and version verification from your local terminal.
# Whenever there is a major upgrade on the Openshift Cluster Platform, this prereq is updated.
function Openshift(){
  ROKS="Client Version: 4.7.19 Server Version: 4.7.21 Kubernetes Version: v1.20.0+558d959"
}

# Openshift Required Local Terinal Tools & the Prerequisites.
function Prerequisites() {
    MISSING_TOOLS=""
    which oc &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} oc"
    which ibmcloud &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} ibmcloud"
    which kubectl &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} kubectl"
    which sed &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} sed"
    which tkn &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} tkn"
    which igc &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} igc"
    which icc &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} icc"
    which jq &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} jq"
    which yq &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} yq"
    git --version &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} git"
    curl --version &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} curl"
    docker -v &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} docker"
    oc version &> /dev/null || MISSING_TOOLS="${MISSING_TOOLS} oc"
    
    if [[ -n "$MISSING_TOOLS" ]]; then
      _out ".Your local terminal failed prerequisites test. Your .kube/config appears to be stale and some tools (${MISSING_TOOLS# }) maybe missing within your terminal, please install or reinstall or fix them first. To fix this issue, review IBM Cloud Native tools installation guides for Mac and Windows machines documentation."
      exit 1
    else
      _out .You have all necessary prerequisites installed.
    fi
}
#################
ocVersion
Openshift
Prerequisites
#################