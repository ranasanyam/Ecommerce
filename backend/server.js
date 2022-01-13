const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Promise Exception`);
    process.exit(1);
})

// Config

dotenv.config({path:"backend/config/config.env"});

// Connecting To Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
})