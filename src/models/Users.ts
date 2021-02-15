import { Schema } from "mongoose";


const UserDatabaseSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    subscription: {
        type: Number,
        required: true,
        default: 0
    },
    stripeCustomerId: {
        type: String,
        default: null
    },
    alerts: {}
});


export {
    UserDatabaseSchema
};
