import { useState } from "react";
import "./App.css";

const MAX_CLICKS = 5;

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const yesWidthPercent = Math.min(50 + noCount * 10, 100);
  const noWidthPercent = 100 - yesWidthPercent;

  // --- CHỈNH SỬA TẠI ĐÂY ---
  // Cũ: 2 + noCount * 3
  // Mới: 1.5 (cỡ chữ ban đầu nhỏ hơn) + noCount * 2.2 (tốc độ to chậm hơn xíu)
  const yesFontSize = 1.5 + noCount * 2.2; 
  
  const noFontSize = 1.2; 

  function handleNoClick() {
    if (noCount < MAX_CLICKS) {
      setNoCount(noCount + 1);
    }
  }

  function getNoButtonText() {
    const phrases = ["No", "Chắc chưa?", "Chắc chắn chưaaa?", "Nói có ii", "Đừng phũ phàng thế", "Khóc đấy 😭"];
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  return (
    <div className="app-container">
      {yesPressed ? (
        <>
          <img
            src="/teo.jpg"
            alt="bear-kiss"
            className="gif-image"
          />
          <div className="text-container">Anh cũng yêu emmmmmmmm💕</div>
        </>
      ) : (
        <>
          <video 
            src="/7498627892335.mp4" 
            className="gif-image"
            autoPlay loop muted playsInline
          />
          <div className="text-container">Như iu anh nhìu hong😗</div>
          
          <div className="button-bar">
            <button
              className="yes-button"
              style={{ 
                width: `${yesWidthPercent}%`,
                fontSize: `${yesFontSize}rem`,
              }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>

            <button
              onClick={handleNoClick}
              className="no-button"
              style={{ 
                width: `${noWidthPercent}%`,
                fontSize: `${noFontSize}rem`,
                padding: noWidthPercent === 0 ? "0" : "15px 0",
                opacity: noWidthPercent === 0 ? 0 : 1,
                border: noWidthPercent === 0 ? "none" : undefined
              }}
            >
              {getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}