import React, { useState, useEffect } from 'react';
import './CircularTest.css';

const LoadingComponent = ({ dataLoading }) => {
  const [load, setLoad] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad((prevLoad) =>  {
        if (prevLoad < 100) {
          return prevLoad + 4; 
        } else {
          clearInterval(interval); 
          return prevLoad;
        }
      });
    }, 100); 


    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (load === 100) {
      
      if (dataLoading) {
        dataLoading();
      }
    }
  }, [load, dataLoading]);

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
