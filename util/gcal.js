const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const path = require('path')
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = './util/token.json';
const CREDENTIALS_PATH = './util/credentials.json';

 initAuth= (callback)=>{
    fs.readFile(CREDENTIALS_PATH, (err, content) => {
        if (err) {
            console.log('The credentials.json file could not be found or was invalid. \n' +
                'Please visit: https://developers.google.com/calendar/quickstart/nodejs \n' +
                'and generate a credentials.json file from that site. Then, place your \n' +
                'credentials file into the "util" directory of this application.');
            process.exit(1);
        }
        authorize(JSON.parse(content), callback);
    });
}

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);


    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({input: process.stdin, output: process.stdout});
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

module.exports = {
    SCOPES,
    initAuth
};