import express from "express"
const viewConfig = (app) => {
    app.use(express.static('./src/public'))
    app.set('viewConfig', "ejs")
    app.set('views', './src/view')
}
export default viewConfig