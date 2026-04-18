import React, { useState } from "react";
import {useNavigate, useLocation} from "react-router-dom";



import "./sidebar.css";


function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();


    return (
        <>
            <div className="sidebar">
                <div className="button-grid">
                    <div className="text_sidebar">
                        <div className="navigation">Navigation</div>
                        Lighthouse
                    </div>
                    <button className={location.pathname === "/" ? "btn active" : "btn"} onClick={() => navigate('/')}>Home</button>
                    <button className={location.pathname === "/new_ticket" ? "btn active" : "btn"} onClick={() => navigate('/new_ticket')}>New Ticket</button>
                    <button className={location.pathname === "/reports" ? "btn active" : "btn"} onClick={() => navigate('/reports')}>My Reports</button>
                    <button className={location.pathname === "/public_issues" ? "btn active" : "btn"} onClick={() => navigate('/public_issues')}>Public Issues</button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;