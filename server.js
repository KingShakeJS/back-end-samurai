const http = require('http')
const fs = require('fs')

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`pages/${path}.html`, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })


}

const server = http.createServer(async (req, res) => {
    switch (req.url) {
        case '/home': {
            try {
                const data = await readFile(`home`)
                res.write(data)
                res.end()
            } catch (e) {
                res.write('error!')
                res.end()
            }
            break
        }
        case '/about': {
            await delay(3000)
            res.write('write about')
            res.end()
            break
        }
        default:
            res.write('404')
            res.end()
    }
})

server.listen(3003)



