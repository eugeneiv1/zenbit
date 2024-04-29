import React, {FC, InputHTMLAttributes} from 'react';

import css from './Input.module.css';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    title: string
    register: any
    name: string
}
const Input:FC<IInput> = ({title, register, name, ...props}) => {
    return (
        <label>
            <p className={css.input_title}>{title}</p>
            <input className={css.input_body} {...register(name)} {...props}/>
        </label>
    );
};

export default Input;