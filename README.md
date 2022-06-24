# About the APP
This app was created to be a free app available for the community where everyone can access and get help or give help.
NGO are allowed.

# How make it works locally
- You may have Nodejs installed. 
- In your local folder that contains the project, installs npm by typing "npm install"
- You also will need to create a project in Realtime database on Google Cloud.
- Create a .env.local file with the info that Google Cloud shared with you.
- You may run `npm start` the the project /

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You can also take a look on the documentation based on UWE on community-docs repo

# Realtime Database roles v2.1.1:
{
  "rules": {
    
    "eventos": {
      ".read": "auth!=null",
      ".write": "auth!=null",
        "$eventoId":{
          ".read": true,
          ".write": "auth!=null && data.child('authorId').val() == auth.id",
          "presenca":{
            ".read": true,
            ".write":"auth!=null && (!data.exists() || data.child('authorId').val() == auth.id)"
          }
        }
    },
    
    "faq":{
      ".write" : true,
      ".read" : "auth!=null && (data.child('authorId').val() == auth.id || auth.id=='123')"
    }
  }
}
