import React from "react";
import leftimage from "../images/leftimg.png";
import rightimage from "../images/rightimg.png"


export default function Home(props){
    return (
        <div className="homeContainer min-h-[100vh] flex items-center justify-center relative overflow-x-hidden">

            <div className="homeContent flex flex-col items-center">
                <h1 className="text-center text-[25px] xs:text-[30px] sm:text-[40px] font-bold text-darkishBlue">Quizzical</h1>
                <p className="text-darkishBlue mt-1 font-medium text-center text-[17px] xs:text-[18px] sm:text-[20px]">Test your quizzical skills</p>
                <button onClick={props.setPage} className="bg-darkBlue border text-grayishWhite py-2 text-[17px] xs:py-3 xs:text-[19px] rounded-[15px] cursor-pointer mt-8 w-[100%] max-w-[160px] active:scale-95 active:shadow-[inset_0px_0px_4px_darkBlue] duration-[.3s] hover:bg-grayishWhite hover:border hover:border-solid hover:border-darkishBlue hover:text-darkishBlue">Start quiz</button>
            </div>    


            {/* Absolute images */}
            <div className="left-image absolute bottom-0 -left-[195px] xs:-left-[150px] ">
                <img src={leftimage} className="w-60"/>
            </div>    
            <div className="right-image absolute top-0 -right-[270px] xs:-right-[225px]">
                <img src={rightimage} className="w-96"/>
            </div>
        </div>
    )
}