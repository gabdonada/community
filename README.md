# About the APP
This app was created to be a free app available for the community where everyone can access and get help or give help.
NGO are allowed.

# How make it works locally
You may run `npm start` the the project /

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You may create a .env.local file with your RealTime DB



# Realtime Database roles v2:
{
  "rules": {
    
    "eventos": {
      ".read": false,
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
      ".read": false,
      ".write" : true
    }
  }
}
}