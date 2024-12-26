import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Body from "./components/Body";
import Header from "./components/Header";
import Btnsend from "./components/Btnsend";
import CircularTest from "./components/CircularTest/CircularTest";
import ModalError from "./components/ModalError";
import Wait from "./utils/Wait";

function App() {
  const { hash } = useParams(); // Captura o hash da URL
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const requestData = async () => {
      if (!hash) {
        // Se o hash não estiver presente na URL, exibe o modal de erro
        setError("Hash não encontrado. Por favor, verifique o link.");
        setOpenModal(true);
        setLoading(false);
        return;
      }

      try {
        const obj = {
          lead_id: hash,
          account: {
            id: 32000011,
            subdomain: "kommoagendamento",
            account_domain: "https://kommoagendamento.kommo.com",
          },
        };

        const { data } = await axios.post(
          "https://dentalsante.aiatende.dev.br/web/calendar/listEvents",
          obj
        );

        await Wait(2000); // Simula um delay de 2 segundos
        setDataLoading(true);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados do calendário:", error);
        setError("Erro ao buscar dados do calendário.");
        setOpenModal(true);
        setLoading(false);
      }
    };

    requestData();
  }, [hash]);

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
              <Body
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
