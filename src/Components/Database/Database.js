import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase.config';
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useForm } from "react-hook-form";

import { UserContext } from '../Routing/Index';

import './Database.css';


const Database = () => {

    const [isSign, setIsSign] = useContext(UserContext);
    const [userData, setUserData] = useState([]);

    const [stylForm, setStylForm] = useState(false);

    const formStyl = () => {
        if (window.scrollY >= 20) {
            setStylForm(true);
        } else {
            setStylForm(false)
        }
    }
    window.addEventListener("scroll", formStyl);


    // react form hook data upded in firebase stroage
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data, e) => {
        const time = Date();
        try {
            const docRef = await addDoc(collection(db, `${isSign.email}`), {
                name: data.name,
                text: data.text,
                time: time
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        };
        e.target.reset();
    };
    // automatic database theke data porar jonna ata

    useEffect(() => {
        const handelReadData = async () => {
            const data = await getDocs(collection(db, `${isSign.email}`));
            setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        handelReadData()
    }, [userData]);


    // firebase theke data delet korar jonna

    const handelDelet = async (id) => {
        await deleteDoc(doc(db, `${isSign.email}`, id));
    };

    // firebase a kono kisu upded korar jonna


    return (
        <div className='total-db'>
            <div className='Database'>
                <div className={stylForm ? "newStyl" : "form-database"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("name")} placeholder="Enter Your Name" required /> <br />
                        <textarea  {...register("text")} placeholder="Enter Your Text" />
                        <button type='submit'>Add Your Document</button>
                    </form>
                </div>
            </div>

            <div className='box-document'>
                {
                    userData.map(user => {
                        return <div key={user.id}>
                            <div className='databasebox'>
                                <h4>{user.name}</h4>
                                <p>{user.time}</p>
                                <h5>{user.text}</h5>                               
                            </div>
                            <div className='delet-btn'><button onClick={() => handelDelet(user.id)}>Delet</button></div>
                        </div>
                    })
                }
            </div>

        </div>

    );
};

export default Database;