import React, {useState} from "react";
import {Link} from "react-router-dom";
import { contactDropDown } from "./NavItems";
import "./DropDownMenu.css"

export default function DropDownMenu() {    
    const [dropDown, setDropDown] = useState(false);    
    return (
        <ul className={dropDown? "contact-submenu clicked": "contact-submenu"} onClick={()=> setDropDown(!dropDown)}>
            {contactDropDown.map(item => {
                return( 
                <li key={item.id}>
                    <Link to={item.path} className={item.cName} onClick={()=> setDropDown(!dropDown)}>
                        {item.title}</Link>
                </li>);
            })}
        </ul>
    );
}