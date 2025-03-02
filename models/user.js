const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/testminip`);

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    image: String
})

module.exports = mongoose.model("user",UserSchema);