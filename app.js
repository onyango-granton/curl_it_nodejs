// curl-auth-native.js
const https = require('https');
const http = require('http');
const url = require('url');

const inputUrl = 'valid_endpoint';
const token = 'valid_token'

if (!inputUrl || !token) {
  console.error('Usage: node curl-auth-native.js <URL> <Bearer_Token>');
  process.exit(1);
}

const parsedUrl = url.parse(inputUrl);
const client = parsedUrl.protocol === 'https:' ? https : http;

const options = {
  hostname: parsedUrl.hostname,
  path: parsedUrl.path,
  port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = client.request(options, res => {
  console.log(`Status: ${res.statusCode}`);
  console.log('Headers:', res.headers);
  res.setEncoding('utf8');
  res.on('data', chunk => process.stdout.write(chunk));
  res.on('end', () => console.log('\n\nRequest complete.'));
});

req.on('error', err => {
  console.error(`Error: ${err.message}`);
});

req.end();
