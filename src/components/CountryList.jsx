import PropTypes from "prop-types"; // Import PropTypes
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
function CountryList({ cities, Loading }) {
  if (Loading) return <Spinner />;
  if (!cities.length)
    return <Message message={"Add cities to your list by clicking on Map"} />;
  return (
    <ul className={styles.countryList}>
      {cities.map((city) => (
        <CountryItem country={city} key={city.id} />
      ))}
    </ul>
  );
}

// Add PropTypes validation for cities and Loading props
CountryList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Add more prop types for each property in the city object if needed
    })
  ).isRequired,
  Loading: PropTypes.bool.isRequired,
};

export default CountryList;
