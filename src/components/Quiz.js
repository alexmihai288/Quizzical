import React from "react";


export default function Quiz(props){
    
    const allAnswers = props.incorrect_answers.map(ie=>ie);
    const correctAnswer = props.correct_answer;
    allAnswers.push(correctAnswer);
    const [isShuffled,setShuffled] = React.useState(false);

    const updatedArray = shuffleArray(allAnswers);
    
    function shuffleArray(arr){
        if(!isShuffled){
            for(let i=0;i<arr.length;i++){
                const randNum=Math.floor(Math.random()*arr.length);
                const aux = arr[i];
                arr[i]=arr[randNum];
                arr[randNum]=aux;
            }
            setShuffled(true)

            return arr;
        }else{
            return arr;
        }
    }
    
    return (
        <div className="quizWrapper">
            <div className="quiz pb-4 border-b-[2px] border-[#e8eaf5] space-y-6">
                <div className="questionHeader">
                    <h1 className="text-darkishBlue max-w-[700px] font-bold text-[18px] xs:text-[22px] sm:text-[24px]">{props.question}</h1>
                </div>
                <div className="questionBody flex items-center justify-evenly gap-[20px]">
                   {
                    updatedArray.map(anws=>{
                        const styles = {
                            backgroundColor:anws.isChecked ? "#d6dbf5":"transparent",
                            border:anws.isChecked ? "none":"2px solid #4d5b9e",
                            padding:"5px 20px",
                            borderRadius:"15px",
                            fontWeight:"medium",
                            color:"#293264",
                            cursor:"pointer"
                        }
                        return <button key={anws.id} style={styles} onClick={()=>props.toggleCheck(anws.id,props.id)}>{anws.value}</button>
                    })
                   }
                </div>
                
            </div>
        </div>
    )
}