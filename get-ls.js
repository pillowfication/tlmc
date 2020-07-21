const fs = require('fs')
const path = require('path')
const http = require('http')

const LS_URL = 'http://home.pf-n.co:3000/ls'
const LS_CACHE = path.resolve(__dirname, './.cache/ls')

fs.access(LS_CACHE, (err) => {
  if (err) {
    console.log('Fetching LS_CACHE...')
    http.get(LS_URL, (res) => {
      const ls = fs.createWriteStream(LS_CACHE)
      res.pipe(ls)
      ls.on('finish', () => {
        ls.close(() => {
          console.log('Fetched LS_CACHE!')
        })
      })
    })
  } else {
    console.log('LS_CACHE exists!')
  }
})
