import React from 'react';
import './Card.css';

function Cards({product}) {
  return (
    <div className='card'>
       <img src={product.thumbnail}/>
      <div>{product.title}</div>
    </div>
  )
}

export default Cards
