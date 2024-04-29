import React from 'react';

import css from './Banner.module.css';
import Button from "../../../../components/Button/Button";

const Banner = () => {
    return (
        <div className={css.banner_container}>
            <div className={css.banner_content}>
                <h1 className={css.banner_header}>The chemical negatively charged</h1>
                <p className={css.banner_text}>Numerous calculations predict, and experiments confirm, that the force field reflects the beam, while the mass defect is not formed.
                    The chemical compound is negatively charged.
                    Twhile the mass defect is </p>
                <Button look='alt-light' onClick={()=> console.log('df')}>Get Started</Button>
            </div>
        </div>
    );
};

export default Banner;
