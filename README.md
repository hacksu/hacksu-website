# HacKSU website

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Website Redirects (aka short URLs)
https://github.com/hacksu/hacksu-2021/wiki/Hacksu-Website-Redirects

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Remote Deployment

Use the following commands to push changes to the hacksu server.

### Add Deploy Remote
```
git remote add live ssh://root@hacksu.com/var/repo/hacksu-2021.git
```

### Deploying
```
git push live master
```

### db folder

The DB folder should have the following structure for entities.js to store `Redirect`, 
`StaffMember`, and `Event` objects in JSON format. This folder acts of the database for site content which changes often.

```
db
├── entities.js
├── events.json
├── redirects.json
└── staff.json
```

Below are examples of each JSON file.

events.json:
```
[
    {
        "id": "some-auto-generated-id",
        "title": "Event Title",
        "date": "yyyy-mm-dd",
        "subtitle": "Event Subtitle",
        "presenter": "John Doe",
        "link": "https://some-relevant-link",
        "description": "",
        "descriptionMD": "**HTML.**",
        "descriptionHTML": "<p><strong>HTML.</strong></p>\n"
  },
]
```
redirects.json
```
[
    {
        "urlSlug": "discord",
        "destination": "https://discord.gg/JNeBC2Y"
    }
]
```
staff.json
```
[
    {
        "id": "some-auto-generated-id",
        "name": "James Corn",
        "gradTerm": "Fall",
        "gradYear": "2026",
        "github": "github-username",
        "photo": "link-to-photo",
        "titles": [
            "Supreme Overlord"
        ],
        "link": ""
    },
]
```
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
