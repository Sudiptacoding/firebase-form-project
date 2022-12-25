import React, { useContext } from 'react';
import { UserContext } from '../Routing/Index';
import { auth } from '../../firebase.config';
import { signOut } from "firebase/auth";
import { Navigate } from 'react-router-dom';

import './Logout.css';

const LogOut = () => {
    const [isSign, setIsSign] = useContext(UserContext);
    const handelLogOut = () => {
        signOut(auth).then(() => {
            const logOutUser = { ...isSign };
            logOutUser.isSignIN = false;
            logOutUser.name = '';
            logOutUser.email = '';
            logOutUser.error = '';
            setIsSign(logOutUser);
            alert("Are you sure to log out this page 😞")
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div >
            <div className='logout'>
                <div><h1>Hello {isSign.name} Are You Sure To Log Out</h1></div>
                <div><button onClick={handelLogOut}>Log Out</button></div>
                {
                    isSign.isSignIN ? <div></div> : <Navigate to='/'></Navigate>
                }
            </div>
        </div>
    );
};

export default LogOut;