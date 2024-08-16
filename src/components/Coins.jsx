import React, { useEffect } from 'react';
import { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import Header from './Header';
import './Coins.css';
import { Link } from 'react-router-dom';

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('inr');

  const currencySymbol = currency === 'inr' ? '₹' : '$';
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`;

  useEffect(() => {
    const setCoinsData = async () => {
      const { data } = await axios.get(url);
      setCoins(data);
      setLoading(false);
    };
    setCoinsData();
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
          <div className='coins-container'>
            <div className="header">
              <div className="symbol">Symbol</div>
              <div className="name">Name</div>
              <div className="price">Price</div>
              <div className="change">24h Change</div>
            </div>
            {coins.map((coindata, i) => (
              <CoinCard key={coindata.id} id={coindata.id} coindata={coindata} currencySymbol={currencySymbol} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

const CoinCard = ({ coindata, currencySymbol ,id}) => {
  const profit = coindata.price_change_percentage_24h > 0;

  return (
    <Link to={`/coins/${id}`} style={{color:'white',textDecoration:'none'}}>
    <div className='ex-cards'>
      <div className="symbol">
        <img height={"30px"} src={coindata.image} alt="" />
      </div>
      <div className="name">
        {coindata.name}
      </div>
      <div className="price">
        {currencySymbol} {coindata.current_price.toFixed(0)}
      </div>
      <div className="change" style={profit ? { color: "green" } : { color: "red" }}>
        {profit ? "+" + coindata.price_change_percentage_24h.toFixed(2) : coindata.price_change_percentage_24h.toFixed(2)}
      </div>
    </div>
    </Link>
  );
};

export default Coins;
