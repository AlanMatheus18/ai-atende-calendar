import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Body from "./components/Body";
import Header from "./components/Header";
import CircularTest from "./components/CircularTest/CircularTest";
import ModalError from "./components/ModalError";
import { listInitialValues } from "./utils/Api";

function App() {
  const { hash } = useParams();

  const [data, setData] = useState({});
  const [selectOptions, setSelectOptions] = useState({
    dentista: "",
    turno: "",
    date: "",
    selectedTime: "",
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const request = async () => {
    try {
      const { data: res } = await listInitialValues(hash);
      setData({
        ...res,
        date: res.date,
      });
      setSelectOptions({
        dentista: res.dentista,
        turno: res.turno,
        date: res.date,
      });
      setDataLoading(true);
      setLoading(false);
    } catch (e) {
      const errorMessage = 'Erro ao capturar dados iniciais!'
      console.error(`${errorMessage} ${e}`);
      setLoading(false);
      setError(`${errorMessage} ${e.message}`);
      setOpenModal(true)
    }
  }
  useEffect(() => {
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
              <Header />
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
