import mongoose from "mongoose";

const geoSchema = new mongoose.Schema({
    lat: {type: String, required: true},
    lng: {type: String, required: true},
});

const addressSchema = new mongoose.Schema({
    street: {type: String, required: true},
    city: {type: String, required: true},
    zipcode: {type: String, required: true},
    geo: {type: geoSchema, required: true},
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]

    },
    phone: {type: String, required: true},
    company: {type: String, required: true},
    address: {type: addressSchema, required: true},
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;