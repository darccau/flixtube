const express = require('express')
const http = require('http')

const app = express()

if (!process.env.PORT) {
  throw Error("Especify environment variable [PORT]")
}

if (!process.env.VIDEO_STORAGE_HOST) {
  throw Error("Especify environment variable [VIDEO_STORAGE_HOST]")
}

if (!process.env.VIDEO_STORAGE_PORT) {
  throw Error("Especify environment variable [VIDEO_STORAGE_PORT]")
}

const PORT = process.env.PORT;
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);

app.get("/video", (req, res) => {
  const forwardRequest = http.request( 
    {
      host: VIDEO_STORAGE_HOST,
      port: VIDEO_STORAGE_PORT,
      path: '/video?path=sample.mp4', 
      method: 'GET',
      headers: req.headers
    }, 
    forwardResponse => {
      res.writeHeader(forwardResponse.statusCode,
        forwardResponse.headers);
      forwardResponse.pipe(res);
    }
  );
    
    req.pipe(forwardRequest);
});

app.listen(PORT, () => {
  console.log(`[*] Listen on http://localhost:${PORT}`)
})
