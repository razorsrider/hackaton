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


function App() {
    return (
        <div className="App">
            <header>
                <Header/>
                {/*<Login/>*/}
                <Calendar/>
            </header>
        </div>
    );
}


export default App;
