import React, { useContext } from "react";
import { AppContext } from "../App";

const uyirLetters = [
  "அ",
  "ஆ",
  "இ",
  "ஈ",
  "உ",
  "ஊ",
  "எ",
  "ஏ",
  "ஐ",
  "ஒ",
  "ஓ",
  "ஔ",
];

const meiLetters = [
  "க",
  "ச",
  "ட",
  "த",
  "ப",
  "ற",
  "ங",
  "ஞ",
  "ண",
  "ந",
  "ம",
  "ன",
  "ய",
  "ர",
  "ல",
  "வ",
  "ழ",
  "ள",
];

const uyirMeiCombinations = {
  க: ["க்", "கா", "கி", "கீ", "கு", "கூ", "கெ", "கே", "கை", "கொ", "கோ", "கௌ"],
  ங: ["ங்", "ஙா", "ஙி", "ஙீ", "ஙு", "ஙூ", "ஙெ", "ஙே", "ஙை", "ஙொ", "ஙோ", "ஙௌ"],
  ச: ["ச்", "சா", "சி", "சீ", "சு", "சூ", "செ", "சே", "சை", "சொ", "சோ", "சௌ"],
  ஞ: ["ஞ்", "ஞா", "ஞி", "ஞீ", "ஞு", "ஞூ", "ஞெ", "ஞே", "ஞை", "ஞொ", "ஞோ", "ஞௌ"],
  ட: ["ட்", "டா", "டி", "டீ", "டு", "டூ", "டெ", "டே", "டை", "டொ", "டோ", "டௌ"],
  ண: ["ண்", "ணா", "ணி", "ணீ", "ணு", "ணூ", "ணெ", "ணே", "ணை", "ணொ", "ணோ", "ணௌ"],
  த: ["த்", "தா", "தி", "தீ", "து", "தூ", "தெ", "தே", "தை", "தொ", "தோ", "தௌ"],
  ந: ["ந்", "நா", "நி", "நீ", "நு", "நூ", "நெ", "நே", "நை", "நொ", "நோ", "நௌ"],
  ப: ["ப்", "பா", "பி", "பீ", "பு", "பூ", "பெ", "பே", "பை", "பொ", "போ", "பௌ"],
  ம: ["ம்", "மா", "மி", "மீ", "மு", "மூ", "மெ", "மே", "மை", "மொ", "மோ", "மௌ"],
  ய: ["ய்", "யா", "யி", "யீ", "யு", "யூ", "யெ", "யே", "யை", "யொ", "யோ", "யௌ"],
  ர: ["ர்", "ரா", "ரி", "ரீ", "ரு", "ரூ", "ரெ", "ரே", "ரை", "ரொ", "ரோ", "ரௌ"],
  ல: ["ல்", "லா", "லி", "லீ", "லு", "லூ", "லெ", "லே", "லை", "லொ", "லோ", "லௌ"],
  வ: ["வ்", "வா", "வி", "வீ", "வு", "வூ", "வெ", "வே", "வை", "வொ", "வோ", "வௌ"],
  ழ: ["ழ்", "ழா", "ழி", "ழீ", "ழு", "ழூ", "ழெ", "ழே", "ழை", "ழொ", "ழோ", "ழௌ"],
  ள: ["ள்", "ளா", "ளி", "ளீ", "ளு", "ளூ", "ளெ", "ளே", "ளை", "ளொ", "ளோ", "ளௌ"],
  ற: ["ற்", "றா", "றி", "றீ", "று", "றூ", "றெ", "றே", "றை", "றொ", "றோ", "றௌ"],
  ன: ["ன்", "னா", "னி", "னீ", "னு", "னூ", "னெ", "னே", "னை", "னொ", "னோ", "னௌ"],
};

const TamilKeyboard = () => {
  const {
    board,
    currAttempt,
    handleKeyPress,
    handleCombination,
    handleDelete,
    handleCheckWord,
    isGameOver,
    isSuccess,
  } = useContext(AppContext);

  const handleMeiClick = (meiLetter) => {
    handleKeyPress(meiLetter, true);
  };

  return (
    <>
      <div className="flex flex-col items-center pt-6 px-2 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between w-full max-w-5xl mb-6 gap-4">
          {/* Uyir or Uyirmei */}
          <div className="w-full sm:w-1/2">
            <div className="grid grid-cols-4 gap-2">
              {currAttempt.lastMeiPos !== null
                ? uyirMeiCombinations[
                    board[currAttempt.attempt][currAttempt.lastMeiPos]
                  ]?.map((combination, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleCombination(combination, currAttempt.lastMeiPos)
                      }
                      className="px-2 py-2 bg-gray-300 shadow shadow-black rounded-md hover:bg-gray-200 cursor-pointer text-sm sm:text-base md:text-lg"
                    >
                      {combination}
                    </button>
                  ))
                : uyirLetters.map((letter, index) => (
                    <button
                      key={index}
                      onClick={() => handleKeyPress(letter)}
                      className="px-4 py-2 bg-gray-300 shadow shadow-black rounded-md hover:bg-gray-200 cursor-pointer text-sm sm:text-base md:text-lg"
                    >
                      {letter}
                    </button>
                  ))}
            </div>
          </div>

          {/* Mei Letters */}
          <div className="w-full sm:w-1/2 pl-0 sm:pl-2">
            <div className="grid grid-cols-6 gap-2">
              {meiLetters.map((meiLetter) => (
                <button
                  key={meiLetter}
                  onClick={() => handleMeiClick(meiLetter)}
                  className="px-4 py-2 bg-gray-300 shadow shadow-black rounded-md hover:bg-gray-200 cursor-pointer text-sm sm:text-base md:text-lg"
                >
                  {meiLetter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-between items-center pb-6 px-2 sm:px-4 w-full max-w-5xl mx-auto">
        <div className="w-8 sm:w-10"></div>

        <button
          onClick={handleCheckWord}
          disabled={currAttempt.letterPos !== 5 || isGameOver || isSuccess}
          className={`px-6 sm:px-8 md:px-10 py-2 shadow shadow-black rounded-md text-sm sm:text-base md:text-lg ${
            currAttempt.letterPos === 5 && !isGameOver && !isSuccess
              ? "bg-gray-300 hover:bg-gray-200 cursor-pointer"
              : "bg-gray-100 cursor-not-allowed"
          }`}
        >
          சரிபார்
        </button>

        <button
          onClick={handleDelete}
          disabled={isGameOver || isSuccess}
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-300 shadow shadow-black rounded-md hover:bg-gray-200 cursor-pointer"
        >
          <img
            className="w-6 h-6 sm:w-8 sm:h-8"
            src="./delete.png"
            alt="delete"
          />
        </button>
      </div>
    </>
  );
};

export default TamilKeyboard;
