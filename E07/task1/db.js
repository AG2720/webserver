//db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ag2720:v4jg1qBA871NyDIn@cluster1.tu7kh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1');
            //useNewUrlParser: true,
            //useUnifiedTopology: true;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error: ', error);
        process.exit(1);
    }
};

module.exports = connectDB;