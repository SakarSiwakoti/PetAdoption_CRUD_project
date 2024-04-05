import React from 'react';
import "./Hero.css";


function Hero(props){
return (

    <div className="hero">
      <img
        src={props.heroImg}
        alt="Hero background"
        className="hero-image"
      />
      <div className="hero-content">
        <div className="hero-text">
          <h1>{props.title}</h1>
             
     </div>
    </div>
    </div>


);
}
 export default Hero;



