import {useState,useRef} from "react"
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import {faqs} from "../array"
function FAQS() {


    const customSlider=useRef();
    const settings = {
   
        lazyLoad:true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
    

    return (
        <div className="trendingContainer  faqsContainer">
        <div className="trendingSectionHeading">
          <div className="title">
            <h1 className="std-heading1">Frequently Asked Questions</h1>
          </div>

        </div>
        <div className="faqsgallery">
          <Slider 
          ref={slider => (customSlider.current = slider)}
          {...settings}>
            {
              faqs.map((item,index)=>{
                return(
                  <div
                   className="faqItem"
                   key={index}
                  >
                  <div  className="faqMainItem" >
                   <div>
                      <p className="ques">{item.ques}</p>
                      <p className="ans">{item.ans}</p>
                   </div>
                  </div>
                  </div>
                )
              })
            }
          </Slider>
          {/* <div className="controls">
          <button onClick={() => customSlider.current.slickPrev()}>
            <NavigateBeforeOutlinedIcon/>
          </button>
          <button onClick={() => customSlider.current.slickNext()}
          >
            <NavigateNextOutlinedIcon/>
          </button>
        </div> */}
        </div>
      </div>

    )
}

export default FAQS
