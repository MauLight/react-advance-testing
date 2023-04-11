import './App.css';
import { useState } from 'react';

export function FeedbackForm({ onSubmit }) {
    const [score, setScore] = useState("10");
    const [comment, setComment] = useState('');

    const isDisabled = Number(score) < 5 && comment.length <= 10;

    const textAreaPlaceholder = isDisabled ? "Please, provide a comment." : "Optional feedback.";

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ score, comment });
    };

    return (
        <div className='App'>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <h2>Feedback Form</h2>
                    <div className='Field'>
                        <label>Score: {score} 🌟</label>
                        <input
                            value={score}
                            onChange={(e) => { setScore(e.target.value) }}
                            type='range'
                            min="0"
                            max="10"
                        />
                    </div>
                    <div className='Field'>
                        <label>Comments:</label>
                        <textarea
                            placeholder={textAreaPlaceholder}
                            name='comment'
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <button onClick={handleSubmit} disabled={isDisabled}>Submit</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};