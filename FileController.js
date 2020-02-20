const fetch = require('node-fetch');
const tauist = require('tauist');

// customize TTL (time to live) as you see fit
const TTL = tauist.s.sevenDays;

const fetchFile = async (fileUrl) => {
	const response = await fetch(fileUrl);
	return [await response.buffer(), response.headers];
};

const sendProxiedFile = (buffer, headerMap, res) => {
	res.set('content-type', headerMap.get('content-type')[0]);
	if (headerMap.has('content-encoding')) {
		res.set('content-encoding', headerMap.get('content-encoding')[0]);
		res.set('Accept-Ranges', 'bytes');
		res.set('Vary', 'Accept-Encoding');
	}

	if (headerMap.has('content-length')) {
		res.set('content-length', headerMap.get('content-length')[0]);
	}

	res.set('cache-control', `public, max-age=${TTL}, stale-while-revalidate=${TTL}`);
	const now = new Date();
	now.setSeconds(now.getSeconds() + TTL);
	res.set('expires', now.toGMTString());

	res.send(buffer);
};

module.exports.get = async (request, response) => {
	const requestedUrl = request.query.url;
	console.info(`Retrieving file: ${requestedUrl}`);
	try {
		const [fileBuffer, originalHeaders] = await fetchFile(requestedUrl);
		sendProxiedFile(fileBuffer, originalHeaders, response);
		console.info(`Proxied file: ${requestedUrl}`);
	} catch (error) {
		console.error(`Could not retrieve file: ${requestedUrl}`, error);
		response.status(500).send('/* error */');
	}
};

