import { useState, useEffect } from "react";
import React from "react";
import { fetchMovies, fetchGenre, fetchMovieByGenre, fetchPersons, fetchTopratedMovie} from "../../service";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Card  } from "react-bootstrap";
import axios from "axios";
const api_Key = "2e89a7f6677def5a021145d6f5e057ad"
const sessionId = "d9756624403bd33e07dbf8ff04e99bd549da4238"
const acc_id = "11183670"
const urlBASE = "https://api.themoviedb.org/3/"






export function Home(){
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [persons, setPersons] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [favMov, setFavMov] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre(28));
      setPersons(await fetchPersons());
      setTopRated(await fetchTopratedMovie());
      
    };
    fetchAPI();
  }, []);
  const handleGenreClick = async (genre_id) => {
    setMovieByGenre(await fetchMovieByGenre(genre_id));
  };
  
  const movies = nowPlaying.slice(0, 7).map((item, index) => {
      return(
          <div style={{ width:"100%" }} key={index}>
              <div className="carousel-center">
                  <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
              </div>
          </div>
      );
  });
  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index} color="#D66D75">
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            handleGenreClick(item.id);
          }}
        >
          {item.name}
        </button>
      </li>
    );
  });
  const movieList = movieByGenre.slice(0, 28).map((item, index) => {


    const addFavList = (id) => {
      axios.post(urlBASE + "account/" + acc_id + "/favorite", 
      {
        media_type: "movie",
        media_id: id,
        favorite: true
      },
      {
        params:{
          api_key: api_Key,
          session_id: sessionId
        }
      }).then((response) => {
        setFavMov(response.data.status_message)
      });
    }

    return (  
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <button className="btn btn-primary btn-sm" 
          onClick={() => {addFavList(item.id)}}
          ><b>+</b></button>
          <p>Rated: {item.rating}</p>
          <p>Id: {item.id}</p>
        </div>
      </div>
    );
  });
 
return (

<>
<Card>
<Navbar collapseOnSelect fixed="top" expand="sm" bg="white" variant="white">
            <Container>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav>
                        <Nav.Link href="/">???? jakFilm Picture ????</Nav.Link>
                        <Nav.Link href="/favorite">Favorite</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
</Navbar>
</Card>
<div className="container">
    <div className="row mt-2 ">
      <div className="col">
        <Carousel
          autoplay={true}
          pauseOnVisibility={true}
          slidesshowSpeed={5000}
          version={4}
          indicators={false}
        >
          {movies}
        </Carousel>
      </div>
    </div>
    <div className="row mt-3">
        <div className="col">
          <h2>Choose your genre!</h2>
          <ul className="list-inline" style={{color: "#D66D75"}}>{genreList}</ul>
        </div>
    </div>
  
    <div className="row mt-3">{movieList}</div>
   
    <div className="row mt-3 mb-5">
        <div className="col-md-8 col-sm-6" style={{ color: "#020024" }}>
          <h3>ABOUT US</h3>
          <p>
          ???? jakFilm Picture ????
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
            perspiciatis? Numquam, enim illo voluptatum neque facere aut sed ut
            dolore nihil? Nulla sit, recusandae ea tenetur rerum deserunt sequi
            earum?
          </p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="/" style={{ color: "#5B86E5" }}>
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" style={{ color: "#ED213A" }}>
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" style={{ color: "#36D1DC" }}>
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" style={{ color: "#E94057" }}>
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-sm-6" style={{ color: "#020024" }}>
          <h3>KEEP IN TOUCH</h3>
          <ul className="list-unstyled">
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> Address:
                </strong>{" "}
                jakarta
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> Phone:
                </strong>{" "}
                +62 wkwk land
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i className="fas fa-envelope"></i> Email:
                </strong>{" "}
                jakinfo@jakFilm.com
              </p>
            </li>
          </ul>
        </div>
      </div>
</div>
</>
  )
}
export default Home;