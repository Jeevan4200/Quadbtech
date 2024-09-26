import React from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
  return (
    <div className='NewsLetter'>
        <h1>Get exclusive offers on your email</h1>
        <p> Suscribe to our newletter and stay updated</p>
        <div>
            <input type='email' placeholder='your email id'/>
            <button>Suscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter