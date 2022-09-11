import * as React from "react"
import * as ReactDOM from 'react-dom/client';
import './index.css';
import {store} from "./store";
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import Header from "./components/Header";
import CreateEvent from "./components/CreateEvent";
import Calendar from "./components/Calendar";
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import 'react-day-picker/dist/style.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Navigate to="/calendar"/>}/>
                        <Route path="/calendar/*" element={<Calendar/>}/>
                        <Route path="/schedule/*" element={<Schedule/>}/>
                        <Route path="/create_ev/*" element={<CreateEvent/>}/>
                        <Route path="/login/*" element={<Login/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
