import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { useEffect, useState } from "react";
const URL = "http://localhost:8000/cities";
export default function App() {
  const [cities, setCities] = useState([]);
  const [Loading, setLoading] = useState(false);
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
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} Loading={Loading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} Loading={Loading} />}
          />
          <Route
            path="countries"
            element={<CountryList cities={cities} Loading={Loading} />}
          />
          <Route path="form" element={<p></p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
