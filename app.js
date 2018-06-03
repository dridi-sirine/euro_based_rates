const http = require('http')
const url = require('url')
const querystring = require('querystring')
const PORT = 8080

http.createServer((req, res) => {
  const params = querystring.parse(url.parse(req.url).query)
  const accessKey = 'f7c70a044a5656103ee8e448c0457129'
  
  http.get(`http://data.fixer.io/api/latest?access_key=${accessKey}`, (result) => {
    let body = ''
    
    result.on('data', (chunk) => {
      body += chunk
    })
    
    result.on('end', () => {
      const data = JSON.parse(body)
      
      const target = {
        base: data.base,
        target: params.target,
        date: data.date,
        rate: data.rates[params.target]
      }
      
      res.setHeader('Content-Type', 'application/json')
      
      res.write(JSON.stringify(target))
      res.end()
    })
  })
}).listen(PORT)
