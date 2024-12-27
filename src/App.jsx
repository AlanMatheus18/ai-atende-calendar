import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Body from "./components/Body";
import Header from "./components/Header";
import Btnsend from "./components/Btnsend";
import CircularTest from "./components/CircularTest/CircularTest";
import ModalError from "./components/ModalError";
import Selectors from "./components/Selectors";
import { HmacSHA1 } from "crypto-js";

function App() {
  const { hash } = useParams(); // Captura o hash da URL
  const [data, setData] = useState([
    {
      calendar: ["Agenda 1", "Agenda 2", "Agenda 3"],
      period: ["Semana atual", "Próxima semana", "Próximo mês"],
      turno: ["Manhã", "Tarde", "Noite"],
      date: "27/12/2024",
      avaiableOptions: [
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
        "19:30:00",
      ],
    },
  ]);
  const [dataLoading, setDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedTurno, setSelectedTurno] = useState("");

  useEffect(() => {
    setSelectedTime(null);
  }, [currentIndex]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setError(null);
  };

  return (
    <>
      {loading ? (
        <CircularTest
          dataLoading={dataLoading}
          onLoadComplete={() => {
            requestData();
          }}
        />
      ) : (
        <>
          {error && (
            <ModalError
              error={error}
              open={openModal}
              setOpen={handleCloseModal}
              setLoading={setLoading}
            />
          )}
          {!error && (
            <>
              <Header
                index={currentIndex}
                setCurrentIndex={setCurrentIndex}
                calendar={data}
                setCalendar={setData}
              />
              <Selectors
                label="Calendário"
                options={data[currentIndex]?.calendar || []}
                value={selectedCalendar}
                onChange={setSelectedCalendar}
              />
              <Selectors
                label="Período"
                options={data[currentIndex]?.period || []}
                value={selectedPeriod}
                onChange={setSelectedPeriod}
              />
              <Selectors
                label="Turno"
                options={data[currentIndex]?.turno || []}
                value={selectedTurno}
                onChange={setSelectedTurno}
              />

              
              <h1 style={{display:"flex"}}>
                {data[currentIndex]?.date}
              </h1>

              <Body
                index={currentIndex}
                setCurrentIndex={setCurrentIndex}
                calendar={data}
                setCalendar={setData}
                times={data[currentIndex]?.avaiableOptions?.slice(0, 2)} // Mostra apenas os dois primeiros horários
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
              <Btnsend
                selectedTime={selectedTime}
                date={data[currentIndex]?.date}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
