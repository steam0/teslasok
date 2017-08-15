# Frontend production
This application is used to push to heroku.

We will remove the normal frontend repository and move over to this when some problems are solved.

## Build
This is how we serve the website on heroku (https://harpjs.com/docs/deployment/heroku).

## During development

You have just pulled this repository, and you are wondering how to start this application.

**First:** You will have to install a couple of programs
* Heroku-CLI (https://devcenter.heroku.com/articles/heroku-cli)
* nodejs and npm (https://nodejs.org/en/ OR `brew install node` if you have homebrew)

**Second:** You need to install dependencies
* Start a terminal
* Navigate to this folder (The folder where this file is located) 
* Perform `npm install`

## I want to test my application locally while developing, and before pushing it to staging

I'm glad you said so. This is easy to do with or without having the Heroku-CLI installed. 

**With Heroku**

* Navigate to this folder
* `npm start`

**Without Heroku**

* Navigate to this folder
* `npm run local`

By doing this you will see the following:
```
[WARN] No ENV file found
9:57:25 PM web.1 |  ------------
9:57:25 PM web.1 |  Harp v0.23.0 – Chloi Inc. 2012–2015
9:57:25 PM web.1 |  Your server is listening at http://localhost:5000/
9:57:25 PM web.1 |  Press Ctl+C to stop the server
9:57:25 PM web.1 |  ------------
```

Right now, the server is running and you can access the website on the address listed. 

**Note:** To be able to do this testing, you will also need to have a local version of the backend 
(https://bitbucket.org/kastproject/backend) server running locally. 

## Pushing to Staging (or  production)

In order to push this application to production you need to have installed the Heroku-CLI. After this is installed you 
need to log in with your user and setting up something called `git remote` to the staging (or production) server.

1. Adding a remote to staging
```
# Show your existing remotes
git remote

# Add a new remote called "staging" and point it to the heroku git repo
git remote add staging https://git.heroku.com/kast-frontend-staging.git
```

2. Pushing your changes to the staging (or production) server
```
# Add, commit and push changes to bitbucket
git add .
git commit -m "Your message"
git push

# Then push changes to staging server
git push staging master
```

## I have to use a new node-dependency, what do I do?

It's easy. Just download and install it to our `package.json`-file.

* Navigate to this folder
* `npm install <packagename> --save`

By doing this you'll see that the `package.json`-file will get a new entry with your dependency

Examples:
```
"dependencies": {
    "angular": "1.5.8",
    "angular-animate": "1.5.8",
}
```
