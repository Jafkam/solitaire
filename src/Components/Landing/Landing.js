import React from 'react';
import { NavLink } from 'react-router-dom';
import './Landing.css'

class Landing extends React.Component {
    render() {
        return(
            <div className='background'>
            <div >
            <NavLink to="/Solitaire">Start Game</NavLink>
            </div>
            </div>
        )
    }
}

export default Landing