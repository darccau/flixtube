const express = require('express')
const fs = require('fs')

const setupHandlers = app => {
  app.get("/video", (req, res) => {

    const videoPath = './videos/sample.mp4'
    fs.stat(videoPath, (err, stats) => {
      if (err) {
        console.error('An error occurred')
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
}

const startHttpServer = () => {
  return new Promise((resolve, reject) => {
    const app = express()
    setupHandlers(app)

    const port = process.env.PORT && parseInt(process.env.PORT) || 3000
    app.listen(port, () => {
      resolve()
    })
  })
}

const main = () => {
  return startHttpServer()
}

main()
.then(() => console.log('Microservice online.'))
.catch(err => {
    console.error('Microservice failed to start.')
    console.error(err && err.stack || err)
  })
