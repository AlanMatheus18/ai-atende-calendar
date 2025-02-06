import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Body from "./components/Body";
import Header from "./components/Header";
import CircularTest from "./components/CircularTest/CircularTest";
import ModalError from "./components/ModalError";
import { listInitialValues } from "./utils/Api";

function App() {
  const { query } = useParams();

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
    try {
      const { data: res } = await listInitialValues(query);

      if (isMounted) {
        setSelectOptions({
          profissional: res.profissional,
          turno: res.turno,
          date: res.date,
          times: res.availableOptions
        });
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
          dataLoading={false}
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
