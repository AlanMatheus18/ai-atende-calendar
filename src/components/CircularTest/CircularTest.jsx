import React, { useState, useEffect } from 'react';
import './CircularTest.css';

const LoadingComponent = ({ progress = 0 }) => {
  const [load, setLoad] = useState(0);

  useEffect(() => {
    if (progress === 100) {
      setLoad(100);
      return;
    }

    const interval = setInterval(() => {
      setLoad((prevLoad) => {
        if (prevLoad < 100) {
          return prevLoad + 1;
        } else {
          clearInterval(interval);
          return prevLoad;
        }
      });
    }, 150);

    return () => clearInterval(interval);
  }, [progress]);


  return (
    <main className='loading-container'>
      <div className="loading-box">
        <p className="loading-title">Carregando datas...</p>
        <div
          className="loading-circle"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, rgba(9, 123, 247, 1) 0%, rgba(0, 212, 255, 1) ${load}%, #525252 ${load}%)`,
          }}
        >
          <p className="loading-count">
            <span id="loadingNumber">{load}</span>%
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoadingComponent;
