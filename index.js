const express = require("express");
const {sequelize} = require('./models')
const cors = require('cors')
const app = express();

const authRoute = require('./routes/auth');
const mainRoute = require('./routes/main');
const adminRoute = require('./routes/admin');

const port = process.env.PORT || 3000;
let corsOption = {
    origin: "http://localhost:8081",
}

app.use(cors(corsOption))
app.use(express.json())
app.use(authRoute, mainRoute, adminRoute)

app.listen(port, async () => {
    console.log(`listen to port: ${port}`)
    await sequelize.authenticate()
    console.log('Database Terhubung!')
});

process.on('unhandleRejection', (err) => {
    console.log(err)
    process.exit()
}); 