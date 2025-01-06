import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Body from "./components/Body";
import Header from "./components/Header";
import CircularTest from "./components/CircularTest/CircularTest";
import ModalError from "./components/ModalError";
import { listInitialValues } from "./utils/Api";



function App() {
  const { hash } = useParams(); // Captura o hash da URL

  // const [data, setData] = useState({
  //   dentista: "Dra. Juliana Leite",
  //   periodo: "Semana atual",
  //   turno: "Manhã",
  //   date: "27/12/2024",
  //   avaiableOptions: [
  //     "10:00:00",
  //     "12:00:00",
  //     "14:00:00",
  //     "16:00:00",
  //     "18:00:00",
  //     "19:00:00",
  //   ],
  // });

  const [data, setData] = useState({});
  const [selectOptions, setSelectOptions] = useState({
    dentista: "",
    periodo: "",
    turno: "",
    date: "",
    selectedTime: "",
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const request = async () => {
      try {
        const res = await listInitialValues(hash);
        setData(res);
        setSelectOptions({
          dentista: res.dentista,
          periodo: res.periodo,
          turno: res.turno,
          date: res.date
        });
        setDataLoading(true);
        setLoading(false)
        console.log(selectOptions);
      } catch (e) {
        const errorMessage = 'Erro ao capturar dados iniciais!'
        setError(`${errorMessage} ${e}`);
        setOpenModal(true)
      }
    }

    request();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    setError(null);
  };

  return (
    <>
      {loading ? (
        <CircularTest
          dataLoading={dataLoading}
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
                dentista={data}
                setDentista={setData}
              />
              <Body
                data={data}
                setData={setData}
                times={data?.avaiableOptions} // Mostra apenas os dois primeiros horários
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
