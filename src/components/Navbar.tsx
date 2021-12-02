import React, {useState} from "react";
import {Link} from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Navbar.css";
import {navItems} from "./NavItems";
import DropDownMenu from "./DropDownMenu";

export default function Navbar(){
    const [dropDown, setDropDown] = useState(false);
    return(
        <>
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                SPARx
                <Icons.FaFire></Icons.FaFire>
            </Link>
            <ul className="nav-items">
                {navItems.map(item => {
                    if (item.title === "Contact Us"){
                        return (
                            <li key={item.id} className={item.cName} onMouseEnter={()=> setDropDown(true)} onMouseLeave= {()=> setDropDown(false)}>
                                <Link to={item.path}>{item.title}</Link> 
                                {dropDown && <DropDownMenu/>}
                            </li>
                            );
                    }else {
                        return (
                            <li key={item.id} className={item.cName}>
                                <Link to={item.path}>{item.title}</Link> 
                            </li>);
                    }
                       })
                }
            </ul>
        </nav>
        </>
    );
}
