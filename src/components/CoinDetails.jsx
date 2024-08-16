import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader';
import './CoinDetails.css';
import {BiSolidUpArrow,BiSolidDownArrow} from 'react-icons/bi';
import {IoPulseOutline} from 'react-icons/io5'
import CoinChart from './CoinChart';
 

const CoinDetails = () => {
  const {id} = useParams();
  const[coin,setCoin] = useState([]);
  const [currency, setCurrency] = useState('inr');
  const currencySymbol = currency === 'inr' ? '₹' : '$';

  const[loading,setLoading] = useState(true);
  const profit = coin.market_data?.price_change_percentage_24h > 0 ;
  useEffect(()=> {
    const getCoin = async() =>{
      try{
        const {data} =await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
       
        setCoin(data);
        setLoading(false);
      }catch(error)
      {
        console.log(error);
        setLoading(false);
      }
    }
    getCoin();
  },[id]);

  return (
    <>
      {
      loading ? <Loader /> : <>
      <div className='coindetail' style={{display:'flex',justifyContent:'space-evenly'}}>
        <div className="coininfo">
        <div className='btn'>
            <button onClick={() => setCurrency('inr')}>INR</button>
            <button onClick={() => setCurrency('usd')}>USD</button>
          </div>
          <div className="time">
            {coin.last_updated}
          </div>
          <div className="coinimage">
            <img height={"150px"} src={coin.image} alt="" />
          </div>

          <div className="coinname">
            {coin.name}
          </div>


          <div className="coinprice">
          {currencySymbol} {coin.market_data.current_price[currency]}
          </div>

          <div className="coinprofit">
           {profit ? <BiSolidUpArrow color='green'/> : <BiSolidDownArrow color='red'/>}
           {coin.market_data.price_change_percentage_24h} %
          </div>

          <div className="marketrank">
            <IoPulseOutline color='orange'/>
            #{coin.market_cap_rank}
          </div>

          <div className="coindesc">
            <p>{coin.description['en'].split('.')[0]}</p>
          </div>

        </div>
        <CoinChart currency={currency}/>

      </div>
      </>}
    </>
  )
}

export default CoinDetails
