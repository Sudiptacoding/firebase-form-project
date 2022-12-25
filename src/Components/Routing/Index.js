import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../About/About';
import Document from '../Document/Document';
import Home from '../Home/Home';
import Login from '../Login/Login';
import LogOut from '../LogOut/LogOut';
import Navbar from '../Navbar/Navbar';
import Privaterouts from '../Privaterouts/Privaterouts';

export const UserContext = createContext();

const Index = () => {
    const [isSign , setIsSign] = useState('');
    return (
        <UserContext.Provider value={[isSign , setIsSign]}>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path='/about' element={<About></About>}></Route>
                    <Route path='/document' element={<Privaterouts isSignIN={isSign.isSignIN}><Document></Document></Privaterouts>}></Route>
                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route path='/logout' element={<LogOut></LogOut>}></Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
};

export default Index;