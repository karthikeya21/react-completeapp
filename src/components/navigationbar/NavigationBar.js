import React from 'react'
import './NavigationBar.css'
import { NavLink } from 'react-router-dom'
import { FaUsers,FaUsersSlash } from "react-icons/fa";

function NavigationBar() {
    const activeLink={
        color:'#EEF0F1',
        fontWeight:'bold',
        fontSize:17,
    }
    const inactiveLink={
        color:'#EEF0F1'
    }

  return (
    <div>
        <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " style={({isActive})=>{
            return isActive?activeLink:inactiveLink;
          }}  to="/users">
          <FaUsers className='user-icons' />
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " style={({isActive})=>{
            return isActive?activeLink:inactiveLink;
          }}  to="/removedusers">
          <FaUsersSlash className='user-icons' />
            Removed Users
            </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default NavigationBar