import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";

import css from './Header.module.css'
import Button from "../Button/Button";
import {AppActions} from "../../store/slices/AppSlice";

const Header = () => {
    let isMatch = false;
    const {user} = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const endpoints = ['auth', 'forgot', 'forgot']

    const {pathname} = useLocation();
    const endpoint = pathname.split('/')[1];
    if(endpoints.includes(endpoint)) {
        isMatch = true;
    }

    const logOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(AppActions.setUser({user: null, email:null}));
    }


    return (
        <div className={css.header}>
            {
                !isMatch && (user.user ?
                    <Button look='alt-light' onClick={logOut}>Log out</Button>

                    : <div className={css.button_container}>
                        <Link to='/auth/login' className={css.link_button}><Button look='alt'>Log In</Button></Link>
                        <Link to='/auth/sign-up' className={css.link_button}><Button>Sign Up</Button></Link>
                    </div>)
            }
        </div>
    );
};

export default Header;