import React from "react";


export default function Quiz(props){
    const updatedArray = props.shuffledAnswers;
    console.log(updatedArray);
    return (
        <div className="quizWrapper">
            <div className="quiz pb-4 border-b-[2px] border-[#e8eaf5] space-y-6">
                <div className="questionHeader">
                    <h1 className="text-darkishBlue max-w-[700px] font-bold text-[18px] xs:text-[22px] sm:text-[24px]">{props.question}</h1>
                </div>
                <div className="questionBody flex items-center justify-evenly gap-[20px]">
                   {
                    updatedArray.map(anws=>{
                        let color="#d6dbf5";
                        if(anws.isChecked && anws.isVerified){
                            if(anws.value===props.correct_answer.value){
                                color="#94d7a2";
                            }else {
                                color="#f6d9db";
                            }
                        }else if(!anws.isChecked){
                            color="transparent";
                        }
                        const styles = {
                            backgroundColor:color,
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