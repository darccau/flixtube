const express = require('express')
const http = require('http')

const app = express()

if (!process.env.PORT) {
  throw Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.VIDEO_STORAGE_HOST) {
  throw Error("Please specify the host name for the video storage microservice in variable VIDEO_STORAGE_HOST.");
}

if (!process.env.VIDEO_STORAGE_PORT) {
    throw Error("Please specify the port number for the video storage microservice in variable VIDEO_STORAGE_PORT.");
}

app.get("/video", (req, res) => {
    const forwardRequest = http.request( // Forward the request to the video storage microservice.
        {
            host: VIDEO_STORAGE_HOST,
            port: VIDEO_STORAGE_PORT,
            path: '/video?path=SampleVideo_1280x720_1mb.mp4', // Video path is hard-coded for the moment.
            method: 'GET',
            headers: req.headers
        }, 
        forwardResponse => {
            res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
            forwardResponse.pipe(res);
        }
    );
    
    req.pipe(forwardRequest);
});

app.listen(PORT, () => {
  console.log(`[*] Listen on http://localhost:${PORT}`)
})
