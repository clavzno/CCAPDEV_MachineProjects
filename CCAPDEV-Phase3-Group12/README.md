# CCAPDEV-Phase-3

## How to use? ( Through running the server in Visual Studio Code )
- We shall assume you have cloned this specific folder
- Open the terminal in your device.
- Run the command `npm install` / `npm i` to install the dependencies needed and used in our MCO3.
- Option 1: Run the command `npm start` to start the server ( There will be a package.json file that declared the `start` script ).
- Option 2: Run the command `npm run devStart` to start the server and actively update the server everytime there is a change in the code ( Although you might have to refresh the page for any changes to be reflected ).
- You can view the running application via the link `http://localhost:3000/login` <- Will be changed if ever

## How to use? ( Deployed Website version )
- https://bookface-p8qd.onrender.com/ <-- You may click that link and it should load the website, starting with the login page.
- Note from Jack: this website runs on the free plan from Render and it states the following: "Your free instance will spin down with inactivity, which can delay requests by 50 seconds or more." so as long as it says "Live" on my end the website should be able to access the MongoDB anytime (Gave the Static Outbound IP Addresses from Render permissions on the MongoDB settings)
- it also only pulls latest commits from the github folder: "CCAPDEV-Phase3-Group12"

  ## Additional Information
  - MONGODB_URI: mongodb+srv://admin:adminpassword@ccapdev-s19-g12.ybpesmo.mongodb.net/
  - DB_NAME: ccapdev-s19-g12
  - PORT: 3000

## We created 5 users to prove that it connects to the database:
### username : password

- TheKing420 : qwerty
- jackieboy : asd
- gerome : gerome
- fazbear : no
- Neil_Best_Prof_Please_Have_Mercy : Iwillgivethisa4

## Multiple Posts Present
## Multiple Comments Present
## Password Hashing Present for Security
# You may connect and refer to the database in MongoDB Compass
