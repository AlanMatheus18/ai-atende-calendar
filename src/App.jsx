import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Body from "./components/Body";
import Header from "./components/Header";
import CircularTest from "./components/CircularTest/CircularTest";
import ModalError from "./components/ModalError";




function App() {
  const { hash } = useParams(); // Captura o hash da URL
  const [data, setData] = useState({
    calendar: "Dra. Juliana Leite",
    period: "Semana atual",
    turno: "Manhã",
    date: "27/12/2024",
    avaiableOptions: [
      "10:00:00",
      "12:00:00",
      "14:00:00",
      "16:00:00",
      "18:00:00",
      "19:00:00",
    ],
  });
  const [selectOptions, setSelectOptions] = useState({
    calendar: "",
    period: "",
    turno: "",
    date: "",
  });

  const [dataLoading, setDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

// Função para simular uma requisição
//usar o useEffect para n entrar em loop 
useEffect(() => {
  function simulateRequest(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulando uma resposta bem-sucedida
        resolve(data);
        
        // Caso queira simular um erro, use o reject
        // reject("Erro na requisição");
      }, 2000); // Atraso de 2 segundos (simula o tempo de uma requisição)
    });
  }
  
  // Testando a função de simulação
  async function testSimulatedRequest() {
    try {
      console.log("Iniciando requisição...");
      
      // Simulando a resposta para listDefaultDate
      const defaultDateResponse = await simulateRequest({
        period: "Semana atual",
        turno: "Manhã",
        dentista: "Dra. Juliana Leite"
      });
      console.log("Resposta de listDefaultDate:", defaultDateResponse);
  
      // Simulando a resposta para listChoiceDate
      const choiceDateResponse = await simulateRequest({
        turno: "Tarde",
        dentista: "Odontopediatria",
        data: "2025-01-10"
      });
      console.log("Resposta de listChoiceDate:", choiceDateResponse);
  
      // Simulando a resposta para listInitialDate
      const initialDateResponse = await simulateRequest({
        period: "Semana atual",
        turno: "Noite",
        dentista: "Demais Dentistas"
      });
      console.log("Resposta de listInitialDate:", initialDateResponse);
  
      // Simulando a resposta para registerDate
      const registerDateResponse = await simulateRequest({
        data: "2025-01-10",
        horario: "14:00:00"
      });
      console.log("Resposta de registerDate:", registerDateResponse);
      
      console.log("Todos os testes foram executados com sucesso!");
    } catch (error) {
      console.error("Erro durante os testes:", error);
    }
  }
  
  // Executando os testes
  testSimulatedRequest();
}, [])


  useEffect(() => {
    setSelectOptions({
      calendar: data?.calendar,
      period: data?.period,
      turno: data?.turno,
    });
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    setSelectedTime(null);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    if (selectOptions?.calendar !== data?.calendar) {
      console.log("Calendar mudou");
      setData({
        calendar: selectOptions?.calendar,
        period: "",
        turno: "",
        date: "",
        avaiableOptions: [],
      });
      setSelectOptions((prev) => ({
        ...prev,
        period: "",
        turno: "",
        date: "",
      }));
      setFirstLoad(false)
    } else if (selectOptions?.period !== data?.period) {
      console.log("Period mudou");
      setData((prev) => ({
        ...prev,
        period: selectOptions?.period,
        turno: "",
        date: "",
        avaiableOptions: [],
      }))
      setSelectOptions((prev) => ({
        ...prev,
        turno: "",
        date: "",
      }));
      setFirstLoad(false)
    } else if (selectOptions?.turno !== data?.turno) {
      console.log("Turno mudou");
      setData((prev) => ({
        ...prev,
        turno: selectOptions?.turno,
        date: "",
        avaiableOptions: [],
      }));
      setFirstLoad(false)
    }
  }, [selectOptions])

  useEffect(() => {

    const updateData = async () => {
      if (
        !firstLoad &&
        data?.calendar !== "" &&
        data?.period !== "" &&
        data?.turno !== ""
      ) {
        await requestData();
      }
    };

    const requestData = async () => {
      try {
        //Simulando uma requisição
        setLoading(true);
        const obj = {
          "date": "31/12/2024",
          "avaiableOptions": [
            "14:00:00",
            "16:00:00",
          ],
        }
        setData((prev) => ({
          ...prev,
          date: obj.date,
          avaiableOptions: obj.avaiableOptions,
        }));
        setTimeout(() => {
          setDataLoading(false);
        }, 2000);
      } catch (error) {
        setError(error);
        setOpenModal(true);
      } finally {
        setLoading(false);
      }
    }

    updateData();
  }, [data]);

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
                calendar={data}
                setCalendar={setData}
              />
              <Body
                data={data}
                setData={setData}
                times={data?.avaiableOptions} // Mostra apenas os dois primeiros horários
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                options={selectOptions}
                setOptions={setSelectOptions}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
