# HacKSU website

## Project setup
```
npm install
```

### Compiles and hot-reloads for development

This uses Vite to create a development server.

```
npm run dev
```

### Compiles and minifies for production

This step uses vite-ssg to save the site's content as HTML. Keep this step in mind when developing the site; if you write code in a Vue component that directly accesses objects that are provided by a browser, like `window`, this step will crash, since this initial build is not run in a browser. You can usually move code that accesses browser-y stuff to a callback like `onMounted` to avoid this.

```
npm run build
```

### Editing Content

Go to https://hacksu.com/login (or http://localhost:8000/login if you're developing the site) to log in. If you have the "Member" role in the HacKSU Discord, you'll be given access to the admin pages and be able to edit the site's content.

### db folder

The DB folder stores JSON files that act as the database for the site's content, which changes often. "entities.js" stores the schema for the objects that will be stored in these files. You should be able to update the database through the admin interface without needing to create or modify these files directly. However, if this site is migrated to another server, transferring the .json files from the old server to the new one is a good idea. (They are not committed to GitHub or git, as they aren't part of the source code and change regularly.)

## Server Configuration

In order for the site to work properly, a server.config.json file must be present in the root directory. An example configuration file is provided below:
```
{
    "sendgrid": {
        "token": "sendgrid token goes here"
    },
    "session": {
        "secret": "session secret goes here"
    },
    "discord": {
        "clientID": "Discord client ID goes here",
        "clientSecret": "Discord client secret goes here"
    }
}
```
