import React from 'react';
import './Explore.css';
import {choice} from '../Assets/choice.js'

const Explore = ({category,setCategory}) => {
  return (
    <>
    <div className='explore' id='explore'>
      <h1>Which Ride Would You Prefer?</h1>

      <div className="explore-list">

        {choice.map((item,index)=>{
            return(
              <div key={index} className="choice" onClick={()=>setCategory(item.name)}>
                  <img className={category===item.name?"active":""} src={item.image} alt="" />
                  <p>{item.name}</p>
              </div>
            )
        })}

      </div>

      <hr />
    </div>
    </>
  )
}

export default Explore
