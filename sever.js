const express = require('express');
const app = express();
const dotenv = require('dotenv');
const syncDatabase = require('./configs/dbSync');
const MainRouter = require('./routers/MainRouter.routes');

dotenv.config();
app.use(express.static('uploads'));
app.use(express.json());


(async () => {
    await syncDatabase();

    // Router
    app.use('/api', MainRouter);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})();
