import mongoose, {Schema, model} from "mongoose";

const messageModel = new Schema({
    message: {
        text: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        }
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    timeSend: {
        type: String,
        require: true,
    },
    isText: {
        type: Boolean,
        require: true,
        default: false
    },
})

export default model("message", messageModel)