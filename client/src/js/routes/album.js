import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Breadcrumb from '../component/breadcrumb';
import {ImageSlider} from '../component/slider'
export default function Album() {

  let location = useLocation(); 

  const [album, setAlbum] = useState([]);  

  const [current, setCurrent] = useState([]);  

  const [sliderOn, setSliderOn] = useState(false);  

  const id = location.pathname.replace(/(?:\/+(\?))/, '$1').replace(/\/+$/, '').split('/')

  const handleClick = (e) => {
    if(e.key && e.key !== 'Enter')
      return
    e.preventDefault()
     let index = e.target.getAttribute('data-tag');
     
     //Set index to tell slider which image is the current one
     setCurrent(index)
       
    //Display slider 
     setSliderOn(true);
  }
  
  const handleCloseSlider = (e) =>{
    if(e.key && e.key !== 'Enter')
      return
    e.preventDefault()

    //Make exception for close-icon class element
    if(e.currentTarget.classList.contains('close-icon')){
      setSliderOn(false);
    }

    if(e.currentTarget != e.target ) return;
    setSliderOn(false);  
    
    
  }
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id[4]}/photos`)
      .then(response => response.json())
      .then(json =>  setAlbum(json) )

      //Remove trailing slash from the url
    }, [location]);
    
  return (
    <div className="wraper">
    { !sliderOn && <Breadcrumb /> }
      <div className="album">
            { !sliderOn && album.map( (image, index) => 
                  <div key={image.id} className="album__wrap">
                    <img className="album__wrap_img" src={image.url} tabIndex="0" data-tag={index} onKeyDown={handleClick} onClick={handleClick} title={ image.title }/> 
                  </div>
            )}  
            {sliderOn && (
                    <ImageSlider slides={ album } close={handleCloseSlider} current={current} />
                )}
      </div>
  </div>
  );
}
