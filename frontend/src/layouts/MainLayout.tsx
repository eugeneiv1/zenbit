import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {useAppDispatch} from "../hooks/reduxHooks";


import Header from "../components/Header/Header";
import {getUser} from "../store/slices/AppSlice";

const MainLayout = () => {
    const dispatch = useAppDispatch()
    useEffect( () => {
        if (localStorage.getItem('accessToken')){
            dispatch(getUser());
        }
    }, [dispatch]);
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;