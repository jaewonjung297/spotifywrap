import axios from 'axios';
const Cookies = require('cookies')

const SPOTIFY_CLIENT = process.env.CLIENT_ID
const SPOTIFY_SECRET = process.env.CLIENT_SECRET
const redirect_uri = 'http://localhost:3000/api/callback'

export default async (req, res) => {
  var code = req.query.code
  const formData = new URLSearchParams();
  formData.append('grant_type', 'authorization_code');
  formData.append('code', code);
  formData.append('redirect_uri', redirect_uri);

  const headers = {
    'Authorization': `Basic ${Buffer.from(SPOTIFY_CLIENT + ':' + SPOTIFY_SECRET).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: formData,
    headers: headers,
  };
  try {
    const response = await axios(authOptions);
    const data = response.data;
    const cookies = new Cookies(req, res);
    cookies.set('access_token', data.access_token, { path: '/', httpOnly: false })
    cookies.set('refresh_token', data.refresh_token, { path: '/', httpOnly: false})
    
    res.setHeader('Location', 'http://localhost:3000/callback')
    res.status(302).end();
  } catch (err) {
    console.error(err)
    res.status(404).json({message: "tough"})
  }
}