import React from 'react'
import {Link} from 'react-router-dom'
// import {copyRight} from 'react-icons-kit'
// import {Icon} from 'react-icons-kit'
// import { AiOutlineCopyrightCircle } from "react-icons/fa6";



export const Footer = () => {
  return (
    <>
        <footer className="footer">
            <div className="foot-container">
                <div className="footer-container left">   
                <Link className='navlink' to="/">ShopLine</Link>
                </div>
                <div className="footer-container center">   
                    <div>Terms of service</div> 
                    
                </div>
                <div className="footer-container right">   
                    <div>
                        2023 ShopLine
                        {/* <Icon icon={copyRight} size={25}/> */}
                    </div>
                    
                </div>
            </div>
        </footer>

    </>
  )
}
