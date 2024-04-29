import React from 'react';
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";

import {axiosService} from "../../services/axiosService";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import css from './ForgotPage.module.css'

const ForgotPage = () => {
    const {register, handleSubmit} = useForm();

    const sendRestoreLink:SubmitHandler<FieldValues> = ({email}) => {
        console.log(email)
        axiosService.post('/user/forgot', {email});
    }
    return (
        <div className={css.forgot_form_container}>
            <h2>Provide e-mail to send restore link</h2>
            <form onSubmit={handleSubmit(sendRestoreLink)} className={css.forgot_form}>
                <Input type="text" register ={register} name ='email' placeholder='Email' title='Email'/>
                <Button type='submit'>Send link</Button>
            </form>
        </div>
    );
};

export default ForgotPage;