const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const blogRouter = require('./routes/BlogRoutes');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/blogs', blogRouter);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const mongoose = require('mongoose');
// Kết nối tới database 20204752 collection blogs
mongoose
    .connect(
        process.env.MONGODB_URI ||
            'mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/20204752?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, function () {
    console.log('App listening at http://127.0.0.1:%s', PORT);
});
