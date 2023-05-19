const express = require('express')
const cors = require('cors')
import viewConfig from '../src/config/viewConfig'
import routerSever from '../src/router/router'
import handleErro from './config/connectDB'
import bodyParser from 'body-parser'
import initRouterAPI from '../src/router/routerAPI'
let app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    origin: true
}))
viewConfig(app)
routerSever(app)
initRouterAPI(app)
require('dotenv').config()
const port = process.env.PORT



handleErro()
app.use((req, res) => {
    return res.send("Can't find this link")
})
app.listen(port, () => {
    console.log(`thành công http://localhost:${port}`)
})