require('dotenv').config();
const mongoose = require('mongoose');
const yargs = require('yargs');
const Name = require('./models/Name');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.error('MongoDB connection error: ', error.mesage)
        process.exit(1)
    }
}

const listNames = async () => {
    try {
        const names = await Name.find({})
        if (names.length === 0) {
            console.log('No names found in the database.')
        } else {
            console.log('Names: ')
            names.forEach(name => {
                console.log(`${name.firstName} ${name.lastName}`)
            })
        }
    } catch (error) {
        console.error('Error fetchng names: ', error.message)
    } finally {
        mongoose.connection.close()
    }
}

const addName = async (firstName, lastName) => {
    try {
        const name = new Name({ firstName, lastName });
        await name.save();
        console.log(`Added: ${firstName} ${lastName}`);
    } catch (error) {
        console.error('Error adding name:', error.message);
    } finally {
        mongoose.connection.close();
    }
};


const argv = yargs
    .usage('Usage: node mongodb_names.js [firstName] [lastName]')
    .help()
    .argv;

const runApp = async () => {
    await connectDB();

    const [firstName, lastName] = argv._;
    if (firstName && lastName){
        await addName(firstName, lastName);
    } else {
        await listNames();
    }
};

runApp();
