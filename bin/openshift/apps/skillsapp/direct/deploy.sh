# @Author: Jeffrey Chijioke-Uche.
# @Team: Lauren Konchan Squad (IBM Garage Technology).
# @Company: IBM.
# @Product: IBM Skills App.
# @Usage: Deployment of IBM Skills App built with NodeJS.
# @Platform: IBM Redhat Openshift Container Platform v4.7+
# @Created: August 1, 2021.
# @Last modified is August 1, 2021. 

#-----------------------------------------------------------------------------
#         DEPLOY THE SKILL APP ON REDHAT OPENSHIFT CLUSTER
#-----------------------------------------------------------------------------

# Variable definition
function define(){
 APP_DIR_REF="<PROVIDE-HERE>"
 REPO_SERVER="<PROVIDE-HERE>"
 REPO_ORG="<PROVIDE-HERE>"
 NAMESPACE="<PROVIDE-HERE>"
}

# Create Namespace
function namespace(){
    oc new-project $NAMESPACE
}

# deploy app pod
function deploy(){
  namespace
  oc new-app $REPO_SERVER/$REPO_ORG/$APP_DIR_REF.git --context-dir=. --name=$APP_DIR_REF 
  podwait
  expose
  exposewait
  IbmRedhat
}

# expose pod route
function expose(){
  oc expose service/$APP_DIR_REF
}

#Pod Waiters:
function podwait(){
sleep 20s & PID=$! 
echo -e "Waiting for created app to be ready..."
printf "["
while kill -0 $PID 2> /dev/null; do 
    printf  "▓"
    sleep 2s
done
printf "] ${GREEN}done!${NOCOLOR}" 
echo -e ""
}
function exposewait(){
sleep 9s & PID=$! 
echo -e "Waiting for created app to be ready..."
printf "["
while kill -0 $PID 2> /dev/null; do 
    printf  "▓"
    sleep 2s
done
printf "] ${GREEN}done!${NOCOLOR}" 
echo -e ""
}

#Process lights:
function Indicators(){
  NOCOLOR='\033[0m'
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  ORANGE='\033[0;33m'
  BLUE='\033[0;34m'
  PURPLE='\033[0;35m'
  CYAN='\033[0;36m'
}
function IbmRedhat(){
  echo -e "${GREEN}App Deployment Completed!${NOCOLOR}"
  echo -e "${GREEN} I B M   R E D H A T    O P E N S H I F T    T E C H N O L O G Y® ${NOCOLOR}"
}
#############
Indicators
define
deploy
##############