var querystring = require('querystring')
const SPOTIFY_CLIENT = process.env.CLIENT_ID
const SPOTIFY_SECRET = process.env.CLIENT_SECRET
const redirect_uri = 'http://localhost:3000/api/callback'
var scope = 'user-read-private user-read-email user-top-read'

export default async (req, res) => {
    if (req.method === 'GET') {
        //redirect to 
        res.redirect('https://accounts.spotify.com/authorize?' + 
            querystring.stringify({
                response_type: 'code',
                client_id: SPOTIFY_CLIENT,
                scope: scope,
                redirect_uri: redirect_uri
            }));
    } else {
        res.status(405).end();
    }
}