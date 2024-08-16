import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Loader from './Loader';
import './Exchanges.css';

const Exchanges = () => {

  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  const [currency, setCurrency] = useState('inr');

  const currencySymbol = currency === 'inr' ? '₹' : '$';

  const url = 'https://api.coingecko.com/api/v3/exchanges';


  useEffect(() => {
    const getExchangesData = async () => {
      try {
        const { data } = await axios.get(url);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange data:', error);
        setLoading(false);
      }
    };
    getExchangesData();
  }, [currency]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className='btns'>
            <button onClick={() => setCurrency('inr')}>INR</button>
            <button onClick={() => setCurrency('usd')}>USD</button>
          </div>
           
          <div className='exchanges-container'>
            <div className='header'>
              <div className='symbol'>Symbol</div>
              <div className='name'>Name</div>
              <div className='price'>24h Trade Volume</div>
              <div className='rank'>Trust Score Rank</div>
            </div>
            {exchanges.map((exchange, index) => (
              <ExchangeCard key={index} exchange={exchange} currencySymbol={currencySymbol} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

const ExchangeCard = ({ exchange,currencySymbol }) => {
  return (
    <div className='ex-cards'>
      <div className='symbol'>
        <img height={'30px'} src={exchange.image} alt='' />
      </div>
      <div className='name'>{exchange.name}</div>
      <div className='price'>{currencySymbol} {exchange.trade_volume_24h_btc.toFixed(2)}</div>
      <div className='rank'>{exchange.trust_score_rank}</div>
    </div>
  );
};

export default Exchanges;
