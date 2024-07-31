import React from 'react'
import { fetchData } from '../helpers'
import { Outlet, useLoaderData } from 'react-router-dom';
import wave from "../assets/wave.svg"
import Nav from '../components/Nav';


//this function fetches data and stores it in loader
export function MainLoader(){
    const userName=fetchData("userName");
    return {userName}
}

function Main() {
    //useLoaderData fetch the loader object and stores it in userName
    const {userName}=useLoaderData()
  return (
    <div className='layout'>
        <Nav userName={userName}/>
        <main>
            <Outlet/>
        </main>
        <img src={wave} alt="" />

        
    </div>
  )
}

export default Main
