import React from 'react';
import { FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {axiosService} from "../../services/axiosService";

import css from './AuthPage.module.css'
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {EAuthAction} from "./enums/authAction.enum";
import {signIn} from "../../store/slices/AppSlice";




const AuthPage = () => {
    let headerText = '';
    let buttonText = '';
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const {authAction} = useParams()

    const dispatch = useAppDispatch();

    switch(authAction){
        case EAuthAction.LOGIN:
            headerText = 'Login';
            buttonText = 'Sign In';
            break
        case  EAuthAction.SING_UP  :
            headerText = 'Register';
            buttonText = "Sign Up";
            break
    }

    const auth: SubmitHandler<FieldValues> = async ({email, password}) => {
        if (authAction === 'login'){
            const {payload: {user}} = await dispatch(signIn({email, password}));
            if (user) {
                navigate('../')
            }
        } else {
            await axiosService.post('/auth/sign-up', {email, password});
        }
    }

    return (
        <div className={css.login_container}>
            <div className={css.login_image}>
            </div>
            <div className={css.login_form}>
                <h2>{headerText}</h2>
                <form onSubmit={handleSubmit(auth)}>
                        <Input type="text" register ={register} name ='email' placeholder='Email' title='Email'/>
                        <Input type="text" register ={register} name ='password' placeholder='Password' title='Password'/>
                    <Link to='/forgot' className={css.forgot_link}>Forgot password?</Link>
                    <Button type='submit'>{buttonText}</Button>
                </form>
                <p>Don't have account? <Link to={'/auth/sign-up'} className={css.link}>Sign Up</Link></p>
            </div>
        </div>
    );
};

export default AuthPage;