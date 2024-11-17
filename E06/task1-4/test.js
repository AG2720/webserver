//update script that i have to manually run everytime...

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path based on your project structure

// MongoDB connection URL
const MONGO_URI = 'mongodb+srv://ag2720:v4jg1qBA871NyDIn@cluster1.tu7kh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'; // Replace with your actual database name

// Function to update the password
const updatePassword = async (email, newPassword) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log('Generated hashed password:', hashedPassword);

    // Update the user's password
    const result = await User.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    if (result.modifiedCount > 0) {
      console.log(`Password updated successfully for user: ${email}`);
    } else {
      console.log(`User not found or no changes made for email: ${email}`);
    }
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

// Run the updatePassword function
const email = 'jakob@podgorsek.com'; // Replace with the user's email
const newPassword = 'jakob123'; // Replace with the new password you want to set

updatePassword(email, newPassword);