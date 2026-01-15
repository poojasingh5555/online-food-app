import React from 'react'
import {useNavigate} from "react-router-dom"

const Addtocart = () => {
  let navigate = useNavigate()

  const onClick = ()=> {
    alert("ORDER")
    navigate("/signup")
  }
  return (
    <div
    onClick={onClick}
    className='px-2 py-4 '>
      <button className='bg-amber-300  rounded-xl'>
        ordernow
      </button>
    </div>
  )
}

export default Addtocart
