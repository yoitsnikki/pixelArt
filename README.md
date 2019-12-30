### This is the readme file for my final project

#### How to install
```
Create the main project Directory
npx create-react-app client in the root directory
npx express-generator api in the root directory
npm install in the api directory
npm install --save cors in the api directory

Open two terminals: run client in one, api in the other

```
#### Edit the Following Files

```
api/app.js
api/database.js

client/src/App.js
client/src/App.css

api/routes/testAPI.js
api/schema/color.js

```

#### Install MongoDB
```

Download Mongo from https://www.mongodb.com/download-center/enterprise?jmp=docs
Extract the tgz
Open terminal
Run the following (note the space after the *):
mv -v ~/Downloads/mongodb-macos-x86_64-4.2.0/bin/* /usr/local/bin

Navigate into the root directory
sudo mkdir -p /data/db
sudo chown -R `id -un` /data/db

mongod
mongo

Mongo DB is now set up! It should be running in terminals next to client and API

```
