import React,{useEffect,useState} from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import leftimage from "./images/leftimg.png";
import rightimage from "./images/rightimg.png";
import {nanoid} from "nanoid";

export default function App(){

  //Handle first page preview
  const [homePage,setHomePage] = useState(true);
  function setPage(){
    setHomePage(false);
  }

  const [quizies,setQuizies] = useState([]);
  
  // API : https://opentdb.com/api.php?amount=5&type=multiple

  useEffect(()=>{
    getData();
    async function getData(){
      const APIrequest = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      const APIresponse = await APIrequest.json();
      const data = APIresponse;

      const quizElements = data.results.map(quiz=>{

        const newQuiz = {
            ...quiz,
            id:nanoid(),
            correct_answer: {value:quiz.correct_answer,id:nanoid(),isChecked:false,isVerified:false},
            incorrect_answers:quiz.incorrect_answers.map(ie=>({value:ie,id:nanoid(),isChecked:false,isVerified:false})),
        }
        const allAnswers = newQuiz.incorrect_answers.map(ie=>ie);
        const correctAnswer = newQuiz.correct_answer;
        allAnswers.push(correctAnswer);
        const shuffledAnswers = shuffleArray(allAnswers);
        const updatedQuiz = {
          ...newQuiz,
          shuffledAnswers:shuffledAnswers
        }
        return updatedQuiz;
      });
      console.log(quizElements);
      setQuizies(quizElements);
    }
  },[homePage]);

  function shuffleArray(arr){
    const newArray = [...arr];
      for(let i=0;i<newArray.length;i++){
        const randNum=Math.floor(Math.random()*newArray.length);
        const aux = newArray[i];
        newArray[i]=newArray[randNum];
        newArray[randNum]=aux;
      }
      return newArray;
  }

  function toggleCheck(childId,parentId){
    setQuizies(prevQuizies=>{
      return prevQuizies.map(quiz=>{
        if(quiz.id===parentId){
          const newQuiz={
            ...quiz,
            correct_answer:quiz.correct_answer.id===childId ? {...quiz.correct_answer,isChecked:!quiz.correct_answer.isChecked}:{...quiz.correct_answer,isChecked:false},
            incorrect_answers:quiz.incorrect_answers.map(ie=>{
              return {
                ...ie,
                isChecked: ie.id === childId ? !ie.isChecked:false,
              }
            }),
            shuffledAnswers:quiz.shuffledAnswers.map(oldQuiz=>oldQuiz.id==childId ? {...oldQuiz,isChecked:!oldQuiz.isChecked}:{...oldQuiz,isChecked:false})
          }
          return newQuiz;
        }else{
          return quiz;
        }
      })
    })
  }

  const elements = quizies.map(quiz=>{
    return <Quiz {...quiz} key={nanoid()} toggleCheck={toggleCheck}/>
  })

  const [buttonText,setButtonText]=useState('Check answers')
  function handleClick(){
    setButtonText(prevText=>prevText==='Check answers' ? "Play again":"Check answers");
    setScore();
    checkCorrectAnswers();
    setCorrect();
  }
  const [showScore,setShowScore] = useState(false);
  function setScore(){
    setShowScore(prevState=>!prevState);
  }

  function setCorrect(){
    setQuizies(prevQuizies=>{
      return prevQuizies.map(quiz=>{
        return {
          ...quiz,
          correct_answer:quiz.correct_answer.isChecked ? {...quiz.correct_answer,isVerified:true}:{...quiz.correct_answer},
          incorrect_answers:quiz.incorrect_answers.map(ie=>{
            return {
              ...ie,
              isVerified:ie.isChecked ? true:false
            }
          }),
          shuffledAnswers:quiz.shuffledAnswers.map(oldQuiz=>{
            return {
              ...oldQuiz,
              isVerified:oldQuiz.isChecked ? true:false
            }
          })
        }
      })
    })
  }

  const [correctAnswers,setCorrectAnswers] = useState(0);

  function checkCorrectAnswers(){
    quizies.forEach(quiz=>{
      if(quiz.correct_answer.isChecked)
        setCorrectAnswers(prevState=>prevState+1)
    })
  }

  function playAgain(){
    setHomePage(true)
    setShowScore(false)
    setCorrectAnswers(0)  
    setButtonText("Check answers")
  }

  return (
    <div className="font-[Karla] bg-grayishWhite">
      {homePage ? <Home setPage={setPage}/> :
      
      //Questions
        <div className="quizContainer overflow-x-hidden relative py-[100px] min-h-[100vh] flex flex-col items-center justify-center">
           <div className="container mx-auto flex flex-col items-center justify-center">
              <div className="space-y-[80px]">
                {elements}
              </div>
              <div className="checkAnswersContainer mt-12 flex gap-[15px] items-center whitespace-nowrap">
                  {showScore && <p className="mt-8 text-darkishBlue font-bold text-[22px]">You scored {correctAnswers}/5 correct answers</p>}
                  <button onClick={buttonText==="Check answers" ? handleClick : playAgain} className="bg-darkBlue border text-grayishWhite px-5 whitespace-nowrap py-2 text-[17px] xs:py-3 xs:text-[19px] rounded-[15px] cursor-pointer mt-8 w-[100%]  active:scale-95 active:shadow-[inset_0px_0px_4px_darkBlue] duration-[.3s]">{buttonText}</button>
                </div>
           </div>
          
           {/* Absolute images   */}
           <div className="left-image absolute bottom-0 -left-[300px] xs:-left-[225px] md:-left-[200px]">
                <img src={leftimage} className="w-60"/>
            </div>    
            <div className="right-image absolute top-0 -right-[270px] xs:-right-[270px] md:-right-[200px]">
                <img src={rightimage} className="w-96"/>
            </div>
        </div>
      }
    </div>
  )
}