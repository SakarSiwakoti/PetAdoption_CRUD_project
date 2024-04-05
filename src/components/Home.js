
import Navbar from "./Navbar";
    import Hero from "./Hero"
    import "./Home.css";
    import imageSrc1  from '../assets/featured.jpg';
    import imageSrc2 from '../assets/lovelyhome.jpeg';
    import imageSrc3 from '../assets/newfooter.jpg';
   
    

    import Footer from "./Footer";
    import React from 'react';
    import { Link } from 'react-router-dom';

    
    
    
    
    

    function Home(){
    return(
        
        <>
        <Navbar/>
        
        <Hero   
        cName = "hero"
        heroImg = {imageSrc3}
       

           />
             <div className="headings-home">
                     <h1>
                     Browse Our Adorable Pets <br/> waiting for their Forever Homes 🐕‍🦺 🐾
                         </h1>
                        </div>

           

               <Link to="/pets">
                <button className="adopt-now-home">ADOPT NOW  <span className="slide"></span> </button>
                </Link>

                    <div className="banner-img">
                    <img src="https://img.freepik.com/free-photo/surprised-dog-big-eyes-looking-from-white-long-frame-banner_1409-4812.jpg" alt="" />
                    </div>
         
            <div className="h1text">
            <h1> 🐾 ADOPT PET, DONT SHOP 🐾</h1>  
            </div>
               
                <div className="Home-content">
                    <div className="home-text">
                <h3>Why Adopt?</h3>
                <p>When you adopt from us, 
                     you're not just finding a new companion-
                      you're saving a life, supporting animal welfare, 
                      and advocating for responsible pet ownership.  </p>
                      <h4>Every adoption saves a life.</h4>
                      </div>

                      <div className="home-text2">
                <h3>Providing a Loving Home</h3>
                <p> Our shelter pets are ready to shower you with love and gratitude.
                     Adopting means offering a forever home to a deserving animal, 
                     providing them with the love and care they deserve.  </p>
                     <h4>Every Adoption Is a Symbol of Hope and Compassion.</h4>
                    
                    

                      </div>

                  
                

              

               <div className="Home-Image1">
                <img 
                src={imageSrc1} 
                alt="Adopt Us"          
                        />
                        <div className="Home-Image2">
                <img 
                src={imageSrc2} 
                alt="Adopt"          
                        />


                        

                        
        </div>
        </div>
        </div>
          
            

    
        <Footer />
        </>
         
    )

}
export default Home;
