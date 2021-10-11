import express from 'express' 
import azure from 'azure-storage'

const app = express()

const PORT = process.env.PORT
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME
const STORAGE_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY

const createBlobService = () => {
  const blobService = azure.createBlobService(STORAGE_ACCOUNT_NAME,
    STORAGE_ACCESS_KEY)
  return blobService
}

app.get('/video', (req, res) => {

  const videoPath = req.query.path
  const blobService = createBlobService()

  const containerName = 'videos'
  blobService.getBlobProperties(containerName,
    videoPath, (err, propertier) => {
    if (err) {
      res.sendStatus(500)
      return
    }

    res.writeHead(200, {
      'Contentype-Length': propertier.contentLength,
      'Content-Type': 'video/mp4'
    })

      blobService.getBlobToStream(containerName,
        videoPath, res, err => {
          if (err) {
            res.sendStatus(500)
            return
          }
      })
  })
}) 

app.listen(PORT, () => {
  console.log(`Server Running on localhost:${PORT}`)
})

