import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isYes, setIsYes] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: 'auto', left: 'auto' });
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [hearts, setHearts] = useState([]);
  const [fallingHearts, setFallingHearts] = useState([]); // New state for background hearts

  // EFFECT 1: Falling hearts (Top to Bottom) - Starts immediately
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 10 + 10,
        duration: Math.random() * 3 + 3,
      };
      setFallingHearts(prev => [...prev, heart]);

      setTimeout(() => {
        setFallingHearts(prev => prev.filter(h => h.id !== heart.id));
      }, 6000);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleNoClick = () => {
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 50);
    setNoPosition({ top: `${randomY}px`, left: `${randomX}px` });
    setNoScale(prev => Math.max(prev - 0.1, 0.3));
    setYesScale(prev => prev + 0.1);
  };

  // EFFECT 2: Floating hearts (Bottom to Top) - Only after Yes
  useEffect(() => {
    if (isYes) {
      const interval = setInterval(() => {
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 90,
          size: Math.random() * 15 + 15,
          duration: Math.random() * 2 + 2,
        };
        setHearts(prev => [...prev, newHeart]);
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 3000);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isYes]);

  return (
    <div className="valentine-container">
      {/* Background Falling Hearts */}
      {fallingHearts.map(heart => (
        <span
          key={heart.id}
          className="falling-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`
          }}
        >
          ❤️
        </span>
      ))}

      <div className={`card ${isYes ? 'success-card' : ''}`}>
        {!isYes ? (
          <div className="content">
            <div className="heart-icon main-heart">❤️</div>
            <h1 className="question-text">Như iu anh nhìu hong 😗</h1>
            
            <div className="btn-group">
              <button 
                className="yes-btn" 
                style={{ transform: `scale(${yesScale})` }}
                onClick={() => setIsYes(true)}
              >
                Có!
              </button>
              
              <button 
                className="no-btn"
                onClick={handleNoClick}
                style={{ 
                  position: noPosition.top === 'auto' ? 'relative' : 'fixed',
                  top: noPosition.top,
                  left: noPosition.left,
                  transform: `scale(${noScale})`,
                  zIndex: 999 
                }}
              >
                Không
              </button>
            </div>
          </div>
        ) : (
          <div className="content success-content">
            <video className="success-video" autoPlay loop playsInline>
              <source src="7530774087832.mp4" type="video/mp4" />
            </video>
            <p className="success-message">Anh yêu em nhiều 💕</p>
            {hearts.map(heart => (
              <span 
                key={heart.id} 
                className="inner-heart"
                style={{ 
                  left: `${heart.left}%`, 
                  fontSize: `${heart.size}px`,
                  animationDuration: `${heart.duration}s`
                }}
              >
                ❤️
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;