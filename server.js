const dotenv = require('dotenv')
const path = require('path');
const express = require('express');
const bird_router = require('./routers/bird_router');
const image_router = require('./routers/image_router');
const Birds = require('./models/birds');

/* load .env */
dotenv.config();

// Database
const mongoose = require("mongoose");
const { rmSync } = require('fs');
const user = process.env.ATLAS_USER;
const password = process.env.ATLAS_PASSWORD;
const db_name = 'Ass-2';
const db_url = `mongodb+srv://${user}:${password}@cluster0.yrzfub1.mongodb.net/${db_name}`
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(db_url, options).then(() => {
    console.log('successfully connected!')
}).catch((e) => {
    console.error(e, 'could not connect!')
});

/* create Express app */
const app = express();

/* setup Express middleware */
// Pug for SSR (static site rendering)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// TODO: middleware for parsing POST body
// TODO: middleware for uploading files

/* host static resources (.css, .js, ...) */
app.use('/images/', image_router);
app.use('/', express.static(path.resolve(__dirname, 'public/')));


app.get('/api/all-birds', async (req, res) => {
    const birds = await Birds.find({});
    console.log(birds);
    res.json(birds);
});

/* redirect root route `/` to `/birds/` */
app.get('/', (req, res) => {
    res.redirect('/birds/');
});

app.use('/birds/', bird_router);

// TODO: 404 page
app.get('*', (req, res) => {
    res.status(404);
    res.render('404');
});

/* start the server */
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is live http://localhost:${PORT}`);
});
