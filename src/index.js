const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const { FLIGHT_SERVICE_PATH } = require('./config/serverConfig');

const setupAndStartServ = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started on Port ${PORT}`);
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }
    })
}

setupAndStartServ();