import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50, // Changed max to maxlength for Mongoose
  },
  likedMovies: Array,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
