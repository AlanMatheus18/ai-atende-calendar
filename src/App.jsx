import Body from "./components/Body.jsx";
import Header from "./components/Header.jsx"
import Btnsend  from "./components/Btnsend.jsx";
import React, { useEffect, useState } from "react";
import DecryptId from '../src/utils/Decrypt.js';
import { useParams } from 'react-router'

function App() {
  const { hash } = useParams();
  const [data, setData] = useState([
    {
      "date": "18/11/2024",
      "avaiableOptions": [
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "19/11/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "20/11/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "21/11/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00"
      ]
    },
    {
      "date": "22/11/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "25/11/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "26/11/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "27/11/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "28/11/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00"
      ]
    },
    {
      "date": "29/11/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "02/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "03/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "04/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "05/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00"
      ]
    },
    {
      "date": "06/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "09/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "10/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "11/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "12/12/2024",
      "avaiableOptions": [
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00"
      ]
    },
    {
      "date": "13/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "16/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    },
    {
      "date": "17/12/2024",
      "avaiableOptions": [
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
        "13:30:00",
        "14:00:00",
        "14:30:00",
        "15:00:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "17:30:00",
        "18:00:00",
        "18:30:00",
        "19:00:00",
        "19:30:00"
      ]
    }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [decryptedId, setDecryptedId] = useState('');

  useEffect(() => {
    // const hash = window.location.hash.substring(1); 
    // console.log(hash)
    if (hash) {
      DecryptId(hash)
        .then(decryptedId => {
          console.log('ID Descriptografado:', decryptedId);
          setDecryptedId(decryptedId);  
        })
        .catch(error => {
          console.error('Erro ao descriptografar ID:', error);
        });
    }
  }, []);
 

  useEffect(() => {
    setSelectedTime(null);  
  }, [currentIndex]);

  return (
    <>
      <Header index={currentIndex} setCurrentIndex={setCurrentIndex} calendar={data} setCalendar={setData} />
      <Body
        times={data[currentIndex]?.avaiableOptions}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime} /> 
      <Btnsend
      selectedTime={selectedTime} 
      date={data[currentIndex]?.date}
      />   
      <div>
      <h2>ID Descriptografado:</h2>
      <p>{decryptedId || 'Descriptografando...'}</p>
    </div>
</>
  );
}

export default App;



// import React, { useEffect, useState } from "react";
// import Body from "./components/Body.jsx";
// import Header from "./components/Header.jsx";
// import Btnsend from "./components/Btnsend.jsx";
// import DecryptId from './utils/DecryptId.js';

// function App() {
//   const [data, setData] = useState([
//     // ... seus dados do calendário
//   ]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [decryptedId, setDecryptedId] = useState('');

//   // Pega o hash da URL e remove o '#' inicial
//   useEffect(() => {
//     const hash = window.location.hash.substring(1); // Remove o '#' da URL
//     if (hash) {
//       DecryptId(hash)
//         .then(decryptedId => {
//           console.log('ID Descriptografado:', decryptedId);
//           setDecryptedId(decryptedId);  // Armazena o ID descriptografado no estado
//         })
//         .catch(error => {
//           console.error('Erro ao descriptografar ID:', error);
//         });
//     }
//   }, []);

//   useEffect(() => {
//     setSelectedTime(null);
//   }, [currentIndex]);

//   return (
//     <>
//       <Header index={currentIndex} setCurrentIndex={setCurrentIndex} calendar={data} setCalendar={setData} />
//       <Body
//         times={data[currentIndex]?.avaiableOptions}
//         selectedTime={selectedTime}
//         setSelectedTime={setSelectedTime}
//       />
//       <Btnsend
//         selectedTime={selectedTime}
//         date={data[currentIndex]?.date}
//       />
//       <div>
//         <h2>ID Descriptografado:</h2>
//         <p>{decryptedId || 'Descriptografando...'}</p>
//       </div>
//     </>
//   );
// }

// export default App;
