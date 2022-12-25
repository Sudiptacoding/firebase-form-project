import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase.config';
import './Login.css';


import { useForm } from "react-hook-form";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { UserContext } from '../Routing/Index';
import { Navigate } from 'react-router-dom';
const provider = new GoogleAuthProvider();


const Login = () => {
    const [isSign, setIsSign] = useContext(UserContext);
    const [regastation, setRagistation] = useState(false);
    const [user, setUser] = useState({
        isSignIN: false,
        name: '',
        email: '',
        error: '',
    });
    setIsSign(user);

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit1 = (data, e) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const newUser = { ...user };
                newUser.isSignIN = true;
                newUser.email = user.email;
                newUser.password = user.password;
                setUser(newUser);
                handelUserUpded(data.name);
                alert('User Registation Succesfully 😘😘')
            })
            .catch(() => {
                alert("User Alrady Regester Please Sign In 🙃🙃")
            });
        e.target.reset();
    };
    const onSubmit = (data, e) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const newUser = { ...user };
                newUser.isSignIN = true;
                newUser.email = user.email;
                newUser.password = user.password;
                setUser(newUser);
                alert('User Log In Succesfully 🥰🥰')
            })
            .catch(() => {
                alert("This User Alrady Log In 😊😊");
            });
        e.target.reset();
    };

    const handelUserUpded = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {

        }).catch(() => {
        });

    }

    useEffect(() => {
        const handelCurrentUser = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const newUser = { ...user };
                    newUser.isSignIN = true;
                    newUser.email = user.email;
                    newUser.password = user.password;
                    newUser.name = user.displayName;
                    setUser(newUser);
                } else {
                    const newUser = { ...user };
                    newUser.isSignIN = false;
                    setUser(newUser);
                }
            });
        }
        handelCurrentUser()
    }, [user]);

    const handelGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const newUser = { ...user };
                newUser.isSignIN = true;
                newUser.name = user.displayName;
                newUser.email = user.email;
                setUser(newUser);

            }).catch((error) => {
                const errorMessage = error.message;
                const newUser = { ...user };
                newUser.error = errorMessage;
                setUser(newUser);
            });
    }
    return (
        <div className='total-login'>
            <Particles
                id="tsparticless"
                init={particlesInit}
                loaded={particlesLoaded}
                options={

                    // akane oe option file gula bosabe

                    {
                        "fullScreen": {
                            "enable": false,
                            "zIndex": -1
                        },
                        "particles": {
                            "number": {
                                "value": 6,
                                "density": {
                                    "enable": true,
                                    "value_area": 800
                                }
                            },
                            "color": {
                                "value": "#1b1e34"
                            },
                            "shape": {
                                "type": "polygon",
                                "polygon": {
                                    "sides": 6
                                }
                            },
                            "opacity": {
                                "value": 0.5,
                                "random": {
                                    "enable": true,
                                    "minimumValue": 0.3
                                },
                                "anim": {
                                    "enable": false,
                                    "speed": 1,
                                    "opacity_min": 0.1,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 160,
                                "random": {
                                    "enable": true,
                                    "minimumValue": 100
                                },
                                "anim": {
                                    "enable": false,
                                    "speed": 5,
                                    "size_min": 40,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": false,
                                "distance": 200,
                                "color": "#ffffff",
                                "opacity": 1,
                                "width": 2
                            },
                            "move": {
                                "enable": true,
                                "speed": 8,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "bubble"
                                },
                                "onclick": {
                                    "enable": false,
                                    "mode": "push"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 400,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "duration": 2,
                                    "size": 40,
                                    "opacity": 0.8,
                                    "speed": 3,
                                    "color": "#ff0000"
                                },
                                "repulse": {
                                    "distance": 200
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true,
                        "background": {
                            "color": "#efefef",
                            "image": "",
                            "position": "50% 50%",
                            "repeat": "no-repeat",
                            "size": "cover"
                        }
                    }

                }
            />
            <div className='login-container'>
                <h1>Welcome To Log In Page</h1>
                <div className='reg-sign-button'>
                    <button className={regastation ? "sign" : "registation"} onClick={() => setRagistation(!regastation)}>{regastation ? "Log In" : "Registation"}</button>
                </div>
                <div>
                    {
                        regastation ? <div className='Log_in_form'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input {...register("email", { required: true })} placeholder='Enter Your Email' />
                                {errors.email && <span>This field is required</span>}

                                <input {...register("password", { required: true })} placeholder='Enter Your Password' />
                                {errors.password && <span>This field is required</span>}

                                <button type='submit'>Log In</button>
                            </form>
                        </div> : <div className='reg_form'>
                            <form onSubmit={handleSubmit(onSubmit1)}>
                                <input {...register("name")} placeholder='Enter Your Name' required />

                                <input {...register("email", { required: true })} placeholder='Enter Your Email' />
                                {errors.email && <span>This field is required</span>}

                                <input {...register("password", { required: true })} placeholder='Enter Your Password' />
                                {errors.password && <span>This field is required</span>}

                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                    }
                </div>
                <div className='Google_sign'>
                    <button onClick={handelGoogleSignIn}>Google Sign In <i class="fa-brands fa-google"></i> </button>
                </div>
                {
                    user.isSignIN && <Navigate to='/document'></Navigate>
                }

            </div>


        </div>



    );
};

export default Login;