const mongoose = require('mongoose');

const connectDB = async () => {

    try {

        const {connection} = await mongoose.connect(process.env.DB_CONNECTION);
        const url = `${connection.host}:${connection.port}`;
        console.log(`MongoDB Connected In: ${url}`);

    } catch (error) {
        console.log(`>>>>>>> ERROR MONGODB: ${error.message} <<<<<<<`);
    }

}

module.exports = connectDB;