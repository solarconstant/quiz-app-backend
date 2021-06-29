const generateQuizCode = () =>
{
    let sample_space = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let quiz_code = "";

    for(let i = 0; i < 8; i++)
    {
        quiz_code += (sample_space[Math.floor(Math.random() * (sample_space.length))]);
    }

    return quiz_code;
}