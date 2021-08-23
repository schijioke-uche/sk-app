## Lauren Konchan Team's IBM Garage Skills App

The is a React app that is set up to use Carbon UI, react-router-dom, has a basic express server, and uses Carbon UI form. This is built around React-Carbon UI components and NodeJS.

## The App Usage

This IBM app is used for storing IBM garage resources skills in the database. These skills can be searched or looked up by Managers and used for client engagement pairing. This application is built to be Redhat Openshift Container Platform compliant. So, can be deployed as a container on Kubernetes running on IBM Cloud.

Then clone & install dependencies

```
$ git clone [your fork SSH/HTTPS]
$ cd konchan_skills_app
$ npm install
```

**FOR DEVELOPMENT ONLY!**
Configure postgreSQL to run in a local container on your machine (choose a port ie. 5445):

```
$ docker run  --name skill_app_db -p <YOUR PORT>:5432 -d davidlevyibm/skills_app_db:latest
```

Make sure you see the container running:

```
$ docker ps
```

you should see something like this

```
CONTAINER ID   IMAGE                               COMMAND                  CREATED       STATUS       PORTS
ff940b06b3f1   davidlevyibm/skills_app_db:latest   "docker-entrypoint.s…"   2 hours ago   Up 2 hours   0.0.0.0:5445->5432/tcp, :::5445->5432/tcp   skills_app_db
```

Create your database configuration:

```
$ cp ./bin/sample.config.sh ./bin/config.sh
$ vi ./bin/config.sh
```

Create your global .env

```
$ cp sample.env .env
$ vi .env
```

Reset and seed database with script:

```
$ npm run seed
```

**Note**: You must have postgres installed on your machine to utilize script

If you get this message after running script:

```
$ zsh: command not found: psql
```

You can reinstall postgresql via brew

```
$ brew update
$ brew install postgresql
```

After install, start postgres service (if not alread started):

```
$ brew services start postgresql
```

Create user postgres if not already created

```
$ creatuser postgres -s
```

Then retry npm run seed. Hopefully that should work.

You can test the db connection with postman.

run locally

```
$ npm run dev
```

## SSO Setup

1. Generate local certs (Need to install [mkcert](https://github.com/FiloSottile/mkcert#installation) )

```bash
mkcert \
  -cert-file=./certs/cert.pem \
  -key-file=./certs/key.pem \
  localhost "*.localhost"
```

2. Need to copy the `sample.env` to `.env` and update with the SSO Provisioner keys.