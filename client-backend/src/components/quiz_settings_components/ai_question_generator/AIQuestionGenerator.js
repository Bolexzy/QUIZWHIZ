import React, { useState, useRef } from 'react';
import './AIQuestionGenerator.css';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


const AIQuestionGenerator = ({ appendToQuizArray }) => {

    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [numOfQuizzes, setNumOfQuizzes] = useState(0);
    const [level, setLevel] = useState('');

    const buttonRef = useRef();

    const handleSubmit = async (e) => {
        buttonRef.current.disabled = true;
        e.preventDefault();

        const prompt = generateAIPrompt(subject, topic, numOfQuizzes, level);
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 500,
        });

        const AIdata = completion.data.choices[0].text;
        console.log(AIdata);

        try {
            let questionArray = JSON.parse(AIdata)
            console.log('valid json');
            console.log(questionArray);
            buttonRef.current.disabled = false;
        } catch (error) {
            console.log('not a valid jason');
            buttonRef.current.disabled = false;
        }
    };


    function generateAIPrompt(subject, topic, numOfQuizzes, level) {
        let prompt =
            `You are a json quiz api that returns an array of objects. i want you to create ${numOfQuizzes} quizes on ${subject} ${topic ? 'under the topic' : ''} ${topic}. ${level ? 'The questions should be at a' : ''} ${level} ${level ? 'level' : ''}. Return the questions, options and the right answers using the following format:
                [
                    {
                    "question": "Question goes here",
                    "options": {
                    "A": "option 1",
                    "B": "option 2",
                    "C": "option 3",
                    "D": "option 4"
                    },
                    "answer": [an array of the right aswer]
                },
                {
                    "question": "Question goes here",
                    "options": {
                    "A": "option 1",
                    "B": "option 2",
                    "C": "option 3",
                    "D": "option 4"
                    },
                    "answer": [an array of the right aswer]
                },
            ]
            do not add any text or explanation at the begining or end of the json array. just retun only the json array.`;
        return prompt;
    }

    return (
        <form className="quiz-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="subject">Subject: (Required)</label>
                <input
                    required
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="topic">Topic: (Optional)</label>
                <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="numOfQuizzes">Number of Quizzes: (Required)</label>
                <input
                    type="number"
                    id="numOfQuizzes"
                    value={numOfQuizzes}
                    min={2} max={8}
                    onChange={(e) => setNumOfQuizzes(parseInt(e.target.value))}
                />
            </div>

            <div className="form-group">
                <label htmlFor="level">Level: (Optional)</label>
                <select id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value="">No Level selected</option>
                    <option value="Nursery education">Nursery education</option>
                    <option value="Primary education">Primary education</option>
                    <option value="Lower secondary education">Lower secondary education</option>
                    <option value="Upper secondary education">Upper secondary education</option>
                    <option value="Bachelor degree education">Bachelor degree education</option>
                    <option value="Masters degree education">Masters degree education</option>
                    <option value="Doctorate degree education">Doctorate degree education</option>
                </select>
            </div>

            <button ref={buttonRef} id="AISubButton" className='stanbutton' type="submit">Submit</button>
        </form>
    );
};

export default AIQuestionGenerator;
