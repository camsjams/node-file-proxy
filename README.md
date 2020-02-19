## node file proxy

Here is a simple demonstration of a node file proxy.

## Status
Beta

## Platforms / Technologies
* [JavaScript](http://en.wikipedia.org/wiki/JavaScript)
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/en/)

## Install
```bash
$ git clone git@github.com:camsjams/node-file-proxy.git
$ cd node-file-proxy
$ npm install
```

## Usage
#### Environment Variables
PORT: sets port - defaults to `3113`


#### Start server
```bash
$ node index.js
# (or npm start but lower overhead with above)
```

#### Proxy file

http://localhost:3113/f?url=YOUR_URL_HERE

#### Example:

http://localhost:3113/f?url=http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js

## Notes
### Security
Security wise you would probably want to whitelist referral domains and request URL domains.

1. Whitelist the request's origin to only permit apps you trust (via domains)
2. Whitelist the request's desired file url to only permit file downloads from domains you trust (Google Analytics, Facebook, etc)

### Content Delivery Network
This service responds back with the basic expiration headers that most CDNs can understand, refer to documentation and CDN dashboard to ensure all headers are present and a cache `HIT` occurs on your CDN.

Your CDN should point to the proxy server, and this relationship will occur:

1. The app or browser sends a request to your CDN. https://your-cdn-domain.com/f?url=http://other-domain.com/file.js
2. Internally, the CDN will request your proxy server at `f?url=http://other-domain.com/file.js`
3. The server (this project code) will serve the response, using the expiration headers sent from your proxy server.
