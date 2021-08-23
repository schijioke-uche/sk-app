
######################################################################################                                     
                                     SIMPLE USE GUIDE
#####################################################################################

Before you begin, be aware that within the config.yaml, this value "build-postgres" 
should be unique if you want to


[Starting an Interactive Shell from your local terminal]
In order to know where the database is running so that we can see the pod name and connect to it, use this command:
==================================================
    oc get pods --selector app=skillapp-postgres
==================================================

This will output the details of the pod that is running the database, something like this.

    NAME                        READY   STATUS      RESTARTS    AGE

    skillapp-postgres-1-fx3jn    1/1     Running     0           1m


[To create an interactive shell within the same redhat openshift container running the database from your local terminal]
You can use the oc rsh command, supplying it the name of the pod.
==============================================
    oc rsh  skillapp-postgres-1-fx3jn
==============================================
