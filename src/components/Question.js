const Question = ({question, answer, dispatch}) => {
    const hasAnswered = answer !== null;
    return (
        <div>
            <h4>{question.question}</h4>
            <div className="options">
                {question.options.map( (option, index) => (
                    <button className={`
                                        btn 
                                        btn-option 
                                        ${index === answer ? "answer" : ""}
                                        ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ("")}
                                      `} 
                            key={option}
                            disable={hasAnswered.toString()} 
                            onClick={()=> dispatch({
                                type: "newAnswer",
                                payload: index
                            })}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Question
