import PropTypes from "prop-types"; // Import PropTypes
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CityList() {
  const { cities, Loading } = useCities();
  if (Loading) return <Spinner />;
  if (!cities.length)
    return <Message message={"Add cities to your list by clicking on Map"} />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

// Add PropTypes validation for cities and Loading props
CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Add more prop types for each property in the city object if needed
    })
  ).isRequired,
  Loading: PropTypes.bool.isRequired,
};

export default CityList;
