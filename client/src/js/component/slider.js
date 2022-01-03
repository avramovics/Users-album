import React, { useEffect, useState, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight , faTimes} from '@fortawesome/free-solid-svg-icons'
export const ImageSlider = (props)=>{

    const [current, setCurrent] = useState(0)

    const length = props.slides.length;  
  
    const nextSlide= (e) => {
      if(e.key && e.key !== 'Enter')
      return
        setCurrent(current === length - 1 ? 0 : current + 1)

    }
    const prevSlide= (e) => {
      if(e.key && e.key !== 'Enter')
      return
        setCurrent(current === 0 ? length - 1 : current -1 )

    }

    useEffect(() => {
     setCurrent(Number(props.current) ? Number(props.current) : 0)
      }, [props.current]);
  
      if(!Array.isArray(props.slides) || props.slides.length <= 0){
        return null

      }

    return(
       <section>
         <button className="close-icon btn" onKeyDown={props.close} onClick={props.close} tabIndex="0" aria-label="Close">
            <FontAwesomeIcon icon={ faTimes } size="2x" />
         </button>
         <div className="image-slider"  onKeyDown={props.close} onClick={props.close}  >
            <button className="icon left-arrow btn" onKeyDown={prevSlide}  onClick={prevSlide} tabIndex="0"  aria-label="Previus slide">
              <FontAwesomeIcon icon={ faArrowAltCircleLeft } onKeyDown={prevSlide}  onClick={prevSlide} size="2x"  /> 
            </button>
            <button className="icon right-arrow btn" onKeyDown={nextSlide} onClick={nextSlide} tabIndex="0" aria-label="Next slide">
              < FontAwesomeIcon  icon={ faArrowAltCircleRight }  size="2x" /> 
            </button>
            <div className="slider_item">
            {props.slides.map((slide ,index)=>{
                return (<div key={index} className={index === current ? 'active' : 'slide'} >
                        {index === current && (
                            <div className="image-slider__wrap">
                            <img tabIndex="0" src={slide.url} alt={slide.title} />
                            <p> {slide.title} </p>
                            </div>
                        )}</div>)
                    })
                }
            </div>
            
          </div>
        </section>
        )
    }