const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            enum: ["Quizmaster", "Quizzer"],
            default: "Quizzer"
        },
        quiz_created: [
            {
                type: ObjectId,
                ref: "Quizzes",
            }
        ],
        quiz_played: [ 
            {
                type: ObjectId,
                ref: "Quiz",
            }
        ],
        avatar: {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema);