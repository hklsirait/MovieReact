import './App.css';
import {Button, Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect  } from "react";
import Header from './component/Header/Header';
import SimpleBottomNavigation from "./component/MainNav";
import Body from "./component/Body/Body";
import PrimarySearchAppBar from "./component/AppBar/AppBar";



function App() {
  return (      
    <>
      <PrimarySearchAppBar />
      <div className="App">
        <Body />
      </div>
    </>  
  );
  
}

export default App;
