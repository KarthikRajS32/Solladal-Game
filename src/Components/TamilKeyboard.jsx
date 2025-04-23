import React, { useState, useContext } from "react";
import { AppContext } from "../App"; // Reuse the existing context


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
  "ப",
  "த",
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
  const [selectedMei, setSelectedMei] = useState(null);
  const [selectedUyir, setSelectedUyir] = useState(null);
  const { inputText, setInputText } = useContext(AppContext);

  const handleMeiClick = (meiLetter) => {
    setSelectedMei(meiLetter);
    setInputText((prev) => prev + meiLetter);
  };

  const handleUyirClick = (uyirLetter) => {
    setSelectedUyir(uyirLetter);
    setInputText((prev) => prev + uyirLetter);
  };

  const handleCombinationClick = (combination) => {
    setInputText((prev) => prev.replace(selectedMei, combination));
    setSelectedMei(null);
  };

  const handleDel = () => {
    setInputText((prev) => prev.slice(0, -1));
  };
  return (
    <>
      <div className="flex flex-col items-center pt-6">
        <div className="flex justify-between w-full max-w-4xl mb-6">
          <div className="w-1/2">
            <div className="grid grid-cols-4 gap-2">
              {selectedMei && uyirMeiCombinations[selectedMei]
                ? uyirMeiCombinations[selectedMei].map((combination, index) => (
                    <button
                      key={index}
                      onClick={() => handleCombinationClick(combination)}
                      className="px-2 py-2 bg-gray-300 shadow shadow-black rounded-md hover:bg-gray-200 cursor-pointer"
                    >
                      {combination}
                    </button>
                  ))
                : uyirLetters.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => handleUyirClick(letter)} // Add Uyir letter to the input text
                      className="px-4 py-2 bg-gray-300 shadow shadow-black rounded-md hover:bg-gray-200 cursor-pointer"
                    >
                      {letter}
                    </button>
                  ))}
            </div>
          </div>

          <div className="w-1/2 pl-2">
            <div className="grid grid-cols-6 gap-2">
              {meiLetters.map((meiLetter) => (
                <button
                  key={meiLetter}
                  onClick={() => handleMeiClick(meiLetter)} // Select the Mei letter
                  className="px-4 py-2 bg-gray-300 shadow shadow-black rounded-md hover:bg-gray-200 cursor-pointer"
                >
                  {meiLetter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 w-full max-w-4xl mx-auto">
        <div className="w-8"></div>

        <button className="px-10 py-2 bg-gray-300 shadow shadow-black rounded-md hover:bg-gray-200 cursor-pointer">
          சரிபார்
        </button>

        <div className="w-10 cursor-pointer bg-gray-300 shadow shadow-black rounded-md hover:bg-gray-200 cursor-pointer">
          <img
            onClick={() => handleDel()}
            className="w-8 h-8"
            src="./delete.png"
            alt="delete"
          />
        </div>
      </div>
      <p>{inputText}</p>
    </>
  );
};

export default TamilKeyboard;
