import React from 'react'
import './styles/homefooter.css'
import Github from '../assets/icons/Github.png'

function HomeFooter() {
    return(
<footer className="footer">
  <img src={Github} alt="Github icon" /> 
</footer>
    );
}

export default HomeFooter;