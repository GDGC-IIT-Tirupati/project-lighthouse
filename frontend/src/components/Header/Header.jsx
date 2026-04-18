import React from "react";

import webLogo from "../../assets/website_logo.png";

import "./header.css";

function Header(){
    return (
        <div className="header">
            <div className="logo">
                <img src = {webLogo} alt="Website Logo" className="logoImage"></img>
            </div>
            <div className="account">

            </div>
        </div>
    );
}


export default Header;