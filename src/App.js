import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isYes, setIsYes] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: 'auto', left: 'auto' });
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [hearts, setHearts] = useState([]);

  const handleNoClick = () => {
    // 1. Tính toán vị trí ngẫu nhiên mới
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 50);
    
    // 2. Cập nhật vị trí và kích thước
    setNoPosition({ top: `${randomY}px`, left: `${randomX}px` });
    setNoScale(prev => Math.max(prev - 0.1, 0.3)); // Thu nhỏ nút No
    setYesScale(prev => prev + 0.1); // Phóng to nút Yes
  };

  // Hiệu ứng tim bay khi đã nhấn Yes
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
      <div className={`card ${isYes ? 'success-card' : ''}`}>
        {!isYes ? (
          <div className="content">
            <div className="heart-icon main-heart">❤️</div>
            <h1 className="question-text">Will you be my Valentine? 💝</h1>
            
            <div className="btn-group">
              <button 
                className="yes-btn" 
                style={{ transform: `scale(${yesScale})` }}
                onClick={() => setIsYes(true)}
              >
                Yes!
              </button>
              
              <button 
                className="no-btn"
                // CHỈ GIỮ LẠI onClick, bỏ onMouseEnter
                onClick={handleNoClick}
                style={{ 
                  position: noPosition.top === 'auto' ? 'relative' : 'fixed',
                  top: noPosition.top,
                  left: noPosition.left,
                  transform: `scale(${noScale})`,
                  zIndex: 999 // Đảm bảo nút No luôn nổi lên trên khi bay khắp màn hình
                }}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="content success-content">
            <video 
              className="success-video" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              {/* Thay link video của bạn ở đây */}
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