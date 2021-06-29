const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const quizSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        rounds: [
            {
                type: String,
                enum: ["Preliminary", "Main", "Wildcard"]
            }
        ],
        sub_rounds: [
            {
                type: String,
                enum: ["Pounce", "Pounce + Bounce", "Buzzer", "Differential", "Long Visual Connect"]
            }
        ],
        participants: [
            {
                type: ObjectId,
                ref: "User"
            }
        ],
        scores: [
            {
                type: ObjectId,
                ref: "Score"
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Quiz", quizSchema);