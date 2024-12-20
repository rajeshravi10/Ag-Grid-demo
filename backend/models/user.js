const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    catchPhrase: { type: String, required: true },
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  net: { type: Number, required: true, default: 0 },
  gross: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
});



module.exports = mongoose.model("User", UserSchema);
