import React, {useEffect, useState} from 'react';

import css from './Deals.module.css'
import {axiosService} from "../../../../services/axiosService";
import Deal from "../Deal/Deal";
import {IDeal} from "../interfaces/deal.interface";

const Deals = () => {
    const [deals, setDeals] = useState<IDeal[]>([]);

    useEffect(() => {
        axiosService.get('/deal').then(({data}) => setDeals(data))
    }, []);
    return (
        <div className={css.deals_container}>
            <h2 className={css.deals_header}>Open Deals</h2>
            <ul className={css.deals_list}>
                {deals.map( (deal) =>
                     <Deal key={deal.id} deal={deal}/>
                )}
            </ul>
        </div>
    );
};

export default Deals;