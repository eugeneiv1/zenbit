import React, {FC, MouseEventHandler, useEffect, useState} from 'react';

import {IDeal} from "../interfaces/deal.interface";
import css from './Deal.module.css'
import {axiosService} from "../../../../services/axiosService";
import {useAppSelector} from "../../../../hooks/reduxHooks";

interface IProps {
    deal: IDeal
}

const Deal:FC<IProps> = ({deal}) => {
    const {id,name, sold, ticket_price, total_price, total_days, yield_percent, image} = deal
    const [dealText, setDealText] = useState('Sign to deal');
    const {user} = useAppSelector(state => state.app);

    const signToDeal:MouseEventHandler = async () => {
        if(user.email) {
            await axiosService.post('/user/sign-to-deal', {deal_Id: id})
        }
    }

    useEffect(() => {
        if (!user.email) {
            setDealText('Sign up or login to sign deal');
        }
    }, [user.email]);
     return (
        <li className={css.deal_item}>
            <div className={css.sign} onClick={signToDeal}>{dealText}</div>
            <img src={image} alt={name} className={css.deal_image}/>
            <div className={css.deal_info} >
                <h3>{name}</h3>
                <div className={css.deal_info_details}>
                    <div>
                        <p>{total_price} Dhs</p>
                        <p>Ticket - {ticket_price} Dhs</p>
                    </div>
                    <div>
                        <p>Yield {yield_percent}%</p>
                        <p>Days left {total_days}</p>
                    </div>

                    <p>Sold {sold}%</p>
                </div>
            </div>
        </li>
    );
};

export default Deal;