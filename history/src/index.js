const express = require('express')

function setupHandlers(app) {
}

function startHttpServer() {
  return new Promise(resolve => {
    const app = express()
    setupHandlers(app)

    const PORT = process.env.PORT && 
      parseInt(process.env.PORT) || 3000
    app.listen(PORT, () => {
      resolve()
    })
  })
}

function main() {
  console.log('hello world')
  return startHttpServer
}

main()
.then(() => console.log("Microservices online"))
.catch(err => {
  console.error("Microservice failed during the start process")
  console.error(err && err.stack || err)
})
