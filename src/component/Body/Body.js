import {  useState, useEffect} from "react";
import {instance} from "../ApiConfig/ApiConfig";
import "./Body.scss";

function Body() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [moviesHere, setMoviesHere] = useState([]);
  
    const handleChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    // Fetch data from API
    useEffect(() => {
      instance.get("/3/movie/upcoming").then(
        (res) => {
          setMoviesHere(res.data.results);
          setLoading();
        },
        (error) => {
          console.log(error); // To catch error
        }
      );
    }, []);
  
    // Logic for search bar
    const results = !searchTerm
      ? moviesHere
      : moviesHere.filter((movie) =>
          movie.title
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        );
  
    // If it is loading then return the paragraph
    if (loading) {
      return <p>Please be patient, it's loading...</p>;
    }
  
    return (
      <div>
        <input
          className="input_style"
          type="text"
          placeholder="Search a movie here"
          value={searchTerm}
          onChange={handleChange}
        />
  
        <div className="movie_container">
          {results.map((item, i) => (
            <h2 key={i}>
              <div className="movie_info_container">
                <img
                  src={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
                  alt="This is a movie"
                  className="movie_here"
                  key={i}
                />
  
                <div className="movie_desc">
                  Movie: {item.title}
                  <span>
                    <p>Release Date: {item.release_date}</p>
                  </span>
                </div>
  
                <div className="overview_container">
                  <h3 className="text">{item.overview}</h3>
                </div>
              </div>
            </h2>
          ))}
        </div>
      </div>
    );
}
export default Body;