import React, {ButtonHTMLAttributes} from 'react';
import css from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    look?: 'main' | 'alt' | 'alt-light',
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({look = 'main' ,children, ...props}) => {
    const className = css.button + ' ' + (look === 'main' ? css.mainButton : look === 'alt' ? css.altButton : css.altLightButton);
    return (
        <button className={className} {...props}>{children}</button>
    );
};

export default Button;