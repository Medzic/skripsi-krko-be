const express = require("express");
const {sequelize} = require('./models')
const app = express();

const authRoute = require('./routes/auth');

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(authRoute)

app.listen(port, async () => {
    console.log(`listen to port: ${port}`)
    await sequelize.authenticate()
    console.log('Database Terhubung!')
});

process.on('unhandleRejection', (err) => {
    console.log(err)
    process.exit()
}); 