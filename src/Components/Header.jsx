import React, { useState } from "react";

const Header = () => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between sm:justify-evenly items-center text-center bg-green-800 text-white shadow-lg shadow-gray-400 px-2 sm:px-4">
        <button
          onClick={() => setShowRules(true)}
          className="text-xl sm:text-2xl md:text-3xl w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-300 rounded-full cursor-pointer transform hover:scale-110 transition duration-200 flex items-center justify-center"
        >
          ?
        </button>
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl rubik-distressed-regular text-center p-2 sm:p-4 md:p-6">
          சொல்லாடல்
        </h1>
        <button
          onClick={() => window.location.reload()}
          className="text-[9px] xs:text-[11px] sm:text-base border-2 border-gray-300 px-1 py-0.5 xs:px-2 xs:py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg cursor-pointer transform hover:scale-102 transition duration-200"
        >
          மீண்டும் <br />விளையாடு
        </button>
      </div>

      {/* Game Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md sm:max-w-xl text-black overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold">
                எப்படி விளையாடுவது
              </h2>
              <button
                onClick={() => setShowRules(false)}
                className="text-xl font-bold px-2 sm:px-3 py-1 cursor-pointer rounded-full hover:bg-gray-300"
              >
                ×
              </button>
            </div>

            <p className="mb-2 text-sm sm:text-base">
              மறைந்துள்ள சொல்லை 5 முயற்சிகளில் கண்டுபிடிக்க.
            </p>
            <p className="mb-2 text-sm sm:text-base">
              ஒரு சொல்லை நுழைத்து <b>சரிபார்</b> பொத்தானை கிளிக் செய்யவும்.
            </p>
            <p className="mb-4 text-sm sm:text-base">
              கீழுள்ள நிற குறிப்புகளை கொண்டு சொல்லின் எழுத்துக்களை சரிபார்க்க.
            </p>

            <hr className="my-4" />
            <h3 className="font-semibold mb-2 text-sm sm:text-base">
              நிற குறிப்புகள்
            </h3>

            {/* Example 1 */}
            <div className="mb-2">
              <div className="flex space-x-1 sm:space-x-2">
                <div className="bg-green-600 text-white text-sm sm:text-base px-1 sm:px-2 py-1 rounded">
                  தெ
                </div>
                <div className="border text-sm sm:text-base px-1 sm:px-2 py-1">
                  ன்
                </div>
                <div className="border text-sm sm:text-base px-1 sm:px-2 py-1">
                  ற
                </div>
                <div className="border text-sm sm:text-base px-1 sm:px-2 py-1">
                  ல்
                </div>
              </div>
              <p className="text-xs sm:text-sm mt-1">
                எழுத்து <b>தெ</b> சொல்லின் சரியான இடத்தில் உள்ளது.
              </p>
            </div>

            {/* Example 2 */}
            <div className="mb-2">
              <div className="flex space-x-1 sm:space-x-2">
                <div className="border text-sm sm:text-base px-1 sm:px-2 py-1">
                  மி
                </div>
                <div className="bg-yellow-400 text-white text-sm sm:text-base px-1 sm:px-2 py-1 rounded">
                  ன்
                </div>
                <div className="border text-sm sm:text-base px-1 sm:px-2 py-1">
                  ன
                </div>
                <div className="border text-sm sm:text-base px-1 sm:px-2 py-1">
                  ல்
                </div>
              </div>
              <p className="text-xs sm:text-sm mt-1">
                எழுத்து <b>ன்</b> சொல்லில் உள்ளது ஆனால் வேறு இடத்தில் உள்ளது.
              </p>
            </div>

            {/* Example 3 */}
            <div className="mb-2">
              <div className="flex space-x-1 sm:space-x-2">
                <div className="border text-sm sm:text-base px-1 sm:px-2 py-1">
                  அ
                </div>
                <div className="border text-sm sm:text-base px-1 sm:px-2 py-1">
                  ச்
                </div>
                <div className="border text-sm sm:text-base px-1 sm:px-2 py-1">
                  ச
                </div>
                <div className="bg-gray-400 text-white text-sm sm:text-base px-1 sm:px-2 py-1 rounded">
                  ம்
                </div>
              </div>
              <p className="text-xs sm:text-sm mt-1">
                எழுத்து <b>ம்</b> சொல்லில் எங்கும் இல்லை.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;