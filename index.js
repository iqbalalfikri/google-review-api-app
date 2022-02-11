const gplay = require('google-play-scraper');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

// This example will return 3000 reviews
// on a single call
// gplay.reviews({
//     appId: 'com.mojang.minecraftpe',
//     sort: gplay.sort.RATING,
//     num: 3000
// }).then(console.log, console.log);


startServer = async () => {

    const app = express()
    app.use(cors({ origin: '*', credentials: true }))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.get('/api/review', async (req, res) => {
        const { query } = req
        console.log(query)
        const { id, lang, num, token } = query
        const result = await gplay.reviews({
            appId: id,
            sort: gplay.sort.HELPFULNESS,
            lang: lang,
            num: num,
            nextPaginationToken: token
        })
        // const { data } = result
        // console.log(result)
        // console.log(data.length)
        res.status(200)
        res.send(result)

    })

    app.listen(5000, () => {
        console.log('Server running')
    })

}

startServer();
