import {Button, Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useState, useEffect  } from "react";

const api_key = "02a0af71da7001b41628363583b340a7";
const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

const GetApi =() => {

  const [data, setData] = useState([]);
  const api = axios.create({ baseURL: BASE_URL});
  const getUpcoming = api.get("movie/upcoming", {params:{api_key}});

  useEffect(() => {
    getUpcoming.then((res) => {
      setData(res.data.results);
    });
  }, 
  []);
  return (
    
      <header className="App-header">
        <div className="grid">
          {data.map((movie) => (
            <div className="item">
              <img src={getImage(movie.poster_path)} />
              <p>{movie.original_title}</p>
            </div>
          ))}
        </div>
      </header>
    
  );
}

export default GetApi;
