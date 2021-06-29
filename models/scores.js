const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const scoreSchema = new mongoose.Schema(
    {
        quiz: {
            type: ObjectId,
            ref: "Quiz"
        },
        scores: [
            {
                subround: String,
                round_score: {
                    quizzer: String,
                    score: Number
                }
            }
        ]
    }
)