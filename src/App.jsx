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
    period: "Nesta Semana",
    turno: "Manhã",
    date: "27/12/2024",
    avaiableOptions: [
      "10:00:00",
      "12:00:00",
    ],
  });
  const [selectOptions, setSelectOptions] = useState({
    calendar: "",
    period: "",
    turno: "",
  });
  const [dataLoading, setDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

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
