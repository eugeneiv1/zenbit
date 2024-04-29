import React from 'react';
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";

import {axiosService} from "../../services/axiosService";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import css from './RestorePage.module.css';

const RestorePage = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const {token} = useParams();

    const changePassword:SubmitHandler<FieldValues> = async ({password}) => {
        await axiosService.post(`/user/forgot/${token}`, {password}).then(({data}) => data);
        navigate('/auth/login');
    }
    return (
        <div className={css.restore_form_container}>
            <form onSubmit={handleSubmit(changePassword)} className={css.restore_form}>
                <Input type="text" register ={register} name ='password' placeholder='Password' title='Password'/>
                <Input type="text" register ={register} name ='password' placeholder='Password' title='Password'/>
                <Button type='submit'>Restore password</Button>
            </form>
        </div>
    );
};

export default RestorePage;