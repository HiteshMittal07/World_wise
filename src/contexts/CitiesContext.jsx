import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();
const URL = "http://localhost:8000/cities";
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCity() {
      try {
        setLoading(true);
        const res = await fetch(`${URL}`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was error caught");
      } finally {
        setLoading(false);
      }
    }
    fetchCity();
  }, []);
  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("there was error caught");
    } finally {
      setLoading(false);
    }
  }
  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      setCities([...cities, data]);
      // setCurrentCity(data);
    } catch {
      alert("there was error caught");
    } finally {
      setLoading(false);
    }
  }
  async function deleteCity(id) {
    try {
      setLoading(true);
      await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
      // setCurrentCity(data);
    } catch {
      alert("there was error caught");
    } finally {
      setLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{ cities, Loading, currentCity, getCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Can't use it here");
  return context;
}
export { CitiesProvider, useCities };
