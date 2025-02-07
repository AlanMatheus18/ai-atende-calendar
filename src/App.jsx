import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Body from "./components/Body";
import Header from "./components/Header";
import CircularTest from "./components/CircularTest/CircularTest";
import ModalError from "./components/ModalError";
import { listInitialValues } from "./utils/Api";
import wait from "./utils/Wait";

function App() {
  const { query } = useParams();
  const [progress, setProgress] = useState(0);
  const [selectOptions, setSelectOptions] = useState({
    profissional: "",
    turno: "",
    date: "",
    selectedTime: "",
    times: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchData = useCallback(async (isMounted) => {
    setLoading(true);
    setProgress(0);
    try {
      const { data: res } = await listInitialValues(query);
      setProgress(100);

      if (isMounted) {
        setSelectOptions({
          profissional: res.profissional,
          turno: res.turno,
          date: res.date,
          times: res.availableOptions
        });
        await wait(1000);
      }

    } catch (e) {
      if (isMounted) {
        const errorMessage = 'Erro ao capturar dados iniciais!';
        console.error(`${errorMessage} ${e}`);
        setError(`${errorMessage} ${e.message}`);
        setOpenModal(true);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }, [query]);

  useEffect(() => {
    if (!query) return;

    let isMounted = true;

    fetchData(isMounted);
    
    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setError(null);
  };

  return (
    <>
      {loading ? (
        <CircularTest
          progress={progress}
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
