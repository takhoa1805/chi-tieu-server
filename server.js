const app = require('./app');
const port = process.env.PORT || 3001;
const connectDatabase = require('./database/config');
require('dotenv').config();

const startServer = async()=>{
    await connectDatabase();
    app.listen(port,()=>{
        console.log(`Server started on port ${port}`);
    });
};

startServer();



