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
                enum: ["Preliminary", "Main"]
            }
        ],
        sub_rounds: [
            {
                type: String,
                enum: ["Prelims", "Pounce", "Pounce + Bounce", "Buzzer", "Differential", "Long Visual Connect"],
                num_of_ques: Number,
                predefined_scores: {
                    correctPrelim:Number,
                    incorrectPrelim: Number,
                    //
                    correctDirect: Number,
                    incorrectDirect: Number,
                    correctPounce: Number,
                    incorrectPounce: Number,
                    correctBounce: Number,
                    incorrectBounce: Number,
                    //
                    correctBuzz: Number,
                    incorrectBuzz: Number,
                    //
                    totalDifferential: Number,
                    //
                    longVisualConnect:[
                        {
                            correct: Number,
                            incorrect: Number
                        }
                    ]
                }
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