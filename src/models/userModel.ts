import {model, Schema} from 'mongoose'

const userModel = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
},)

export default model("user", userModel)