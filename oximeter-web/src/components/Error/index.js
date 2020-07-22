import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from "../../images/404_v2.png";
import VerifyEmail from "../../images/Verify-email.png";
import background from "../../images/fondo.jpg";

const back_style = {
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  textAlign: 'center',
}
const Errors = {
  "404": PageNotFound,
  "Verify": VerifyEmail,
};

export default function Error({ err, msj }) {
  return (<div className="root" style={back_style}>
    <Link to="/home">
      <img src={Errors[err]} alt={err} style={{ height: '50vh', margin: '5%' }} />
    </Link>
    <h2>{msj}</h2>
  </div >);
}