import mongoose from "mongoose";
import autoIncerment from 'mongoose-auto-increment'

autoIncerment.initialize(mongoose.connection);


const customerSchema = mongoose.Schema({
    device: String,
    brand: String,
    name: String,
    mobile: String,
    problem: String,
    cost: String,
    note: String,
    date: String,
    time: String,
    status: String,
    time2: String,
    productDetails: String,
    totalAmount: String,
    advanceAmount: String,
})

customerSchema.plugin(autoIncerment.plugin, { model: 'customer', field: '_id' });

const customer = mongoose.model('customer', customerSchema);

export default customer;
