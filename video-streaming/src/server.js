const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

if (!process.env.PORT) {
  throw new Error('[!] Not especified port')
}

const PORT = process.env.PORT

app.get('/video', (req, res) => {
  const videoPath = path.resolve(__dirname, '..', 'videos', 'sample.mp4')

  fs.stat(videoPath, (err, stats) => {
    if (err) {
      console.error('An error occurred ')
      res.sendStatus(500)
      return
    }

    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': 'video/mp4',
    })
    fs.createReadStream(videoPath).pipe(res)
  })
})

app.listen(PORT, () => {
  console.log(`[*] Listen on http://localhost:${PORT}`)
})
