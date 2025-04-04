import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  password: String,
});

export const User = mongoose.model("User", userSchema);

export const fetchUserById = async (id) => {
    try {
      const user = await User.find()
    //   const user = await User.findById( id, "name email" )
      console.log(user, "user")
      return user;
    } catch (error) {
      return error;
    }
  };