import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../Routing/Index';
import './Navbar.css';

const Navbar = () => {
    const [isSign, setIsSign] = useContext(UserContext);
    const [navbar, setNavar] = useState(false);
    const navBackGroundChange = () => {
        if (window.scrollY >= 80) {
            setNavar(true)
        } else {
            setNavar(false)
        }
    }
    window.addEventListener('scroll', navBackGroundChange);
    return (
            <nav className={navbar ? "active-nav" : "nav"}>
                <NavLink to='/'><span>Home</span></NavLink>
                <NavLink to='/about'><span>About</span></NavLink>
                <NavLink to='/document'><span>Document</span></NavLink>
                <span>
                    {
                        (isSign.isSignIN) && <NavLink to='/logout'>LogOut</NavLink> 
                    }
                </span>
            </nav>
    );
};

export default Navbar;