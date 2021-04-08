const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const auth = require('./routes/auth');
const users = require('./routes/users');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }))

app.use('/scotibank',auth)
app.use('/scotibank',users)

app.listen(3001, () => {
    console.log("servidor: \x1b[32m%s\x1b[0m", "online");
})