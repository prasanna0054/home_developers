import React from 'react'
import "./Footer.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
function Footer() {
  return (
    <div className='ftr'>
        <h6>© Copyright Home Developers 2022</h6>
        <FacebookIcon/>
        <TwitterIcon/>
        <InstagramIcon/>
    </div>
  )
}

export default Footer