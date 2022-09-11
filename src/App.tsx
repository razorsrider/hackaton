import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import {BrowserRouter} from 'react-router-dom';
import Header from "./components/Header";
import Login from "./components/Login";
import Calendar from "./components/Calendar";
import Schedule from "./components/Schedule";
import CreateEvent from "./components/CreateEvent";


function App() {
    return (
        <div className="App">

            <Header/>



            {/*<Login/>*/}
            {/*<Calendar/>*/}
            {/*<Schedule/>*/}
            <CreateEvent/>

        </div>
    );
}


export default App;
