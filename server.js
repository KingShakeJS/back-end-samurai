const http = require('http')

let reqCount = 0

const server = http.createServer((req, res) => {
    reqCount++

    switch (req.url) {
        case '/students':
            res.write('students')
            break
        case '/':
        case '/courses':
            res.write('courses')
            break
        default:
            res.write('404')
    }
    res.write(' IT-KAMASUTRA ' + reqCount)


    res.end()
})

server.listen(3003)



