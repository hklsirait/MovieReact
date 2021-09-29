import React from "react";
import axios from "axios";
import {Container, Navbar, Nav, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
const api_Key = "2e89a7f6677def5a021145d6f5e057ad"
const sessionId = "d9756624403bd33e07dbf8ff04e99bd549da4238"
const acc_id = "11183670"
const urlBASE = "https://api.themoviedb.org/3/"

export function FavoriteList(){

    const[favMovie, setFavMovie] = React.useState([])
    const[respMov, setRespMov] = React.useState()

    
    React.useEffect(() => {
        axios.get(urlBASE+"/account/"+acc_id+"/favorite/movies",{
            params: {
                api_key: api_Key,
                session_id: sessionId,
                sort_by: "created_at.asc"
            }
        }).then((response) => {
            setFavMovie(response.data.results)
        })
    },[])

    
    const getPoster = (path) => `https://image.tmdb.org/t/p/w185/${path}`


    function refreshFav(){
        axios.get(urlBASE+"/account/"+acc_id+"/favorite/movies",{
            params: {
                api_key: api_Key,
                session_id: sessionId,
                sort_by: "created_at.asc"
            }
        }).then((response) => {
            setFavMovie(response.data.results)
        })
    }

    const favList = favMovie.map((mv, index) => {

        

        const removeMov = (id) => {
            axios.post(urlBASE+"account/"+ acc_id +"/favorite",
            {
                media_type: "movie",
                media_id: id,
                favorite: true
            },
            {
                params: {
                    api_key: api_Key,
                    session_id: sessionId
                }
            }).then((response) => {
                setRespMov(response.data.status_message)
                refreshFav();
            });
        }

        return(
            <div className="col-md-3 col-sm-6" key={index} >
                            <div className="card">
                                <Link to={`/movie/${mv.id}`}>
                                <img className="img-fluid" style={{alignItems:'center'}} src={getPoster(mv.poster_path)} alt={mv.title}></img>
                                </Link>
                            </div>
                        <div className="mt-3">
                            <button variant="danger" onClick={() => {removeMov(mv.id)}} style={{position:'bottom', alignItems:'center'}}>Remove</button>
                            <p>{mv.title}</p>
                            <p>Id: {mv.id}</p>
                        </div>
                        </div>

        )

    })



    return(
        <div>
            <Card>
            <Navbar collapseOnSelect fixed="top" expand="sm" bg="white" variant="white">
            <Container>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav>
                        <Nav.Link href="/">🎬 jakFilm Picture 🎥</Nav.Link>
                        <Nav.Link href="/favorite">Favorite</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </Card>
            <Container>
                <div className="row mt-2">
                <h1>Your Favorite</h1>
                <div className="row mt-3">{favList}</div>
                </div>
            
        <div className="row mt-3 mb-5">
            <div className="col-md-8 col-sm-6" style={{ color: "#020024" }}>
            <h3>ABOUT US</h3>
            <p>
            🎬 jakFilm Picture 🎥
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
        </Container>
        </div>

    )
}