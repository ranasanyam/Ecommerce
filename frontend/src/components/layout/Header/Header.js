import React from 'react'
import { ReactNavbar } from 'overlay-navbar';
import logo from '../../../images/logo.png';


const options = {
    burgerColor: "#1E90F7",
    burgerColorHover:"rgb(25, 80, 180)",
    logo,
    logoWidth:"20vmax",
    navColor1:"white",
    logoHoverSize:"10px",
    logoHoverColor:"#1E90F7",
    
    link1Text:"Home",
    link2Text:"Products",
    link3Text:"Contact",
    link4Text:"About",
            
    link1Url:"/",
    link2Url:"/products",
    link3Url:"/contact",
    link4Url:"/about",

    link1Size:"1.3vmax",
    link1Color:"rgba(35, 35, 35, 0.8)",
    nav1justifyContent: 'flex-end',
    nav2justifyContent: 'flex-end',
    nav3justifyContent: 'flex-start',
    nav4justifyContent: 'flex-start',

    link1ColorHover: '#1E90F7',
    link1Margin: '1vmax',

    profileIconUrl: '/login',
    profileIconColor: 'rgba(35, 35, 35, 0.8)',
    searchIconColor: 'rgba(35, 35, 35, 0.8)',
    cartIconColor: 'rgba(35, 35, 35, 0.8)',
    profileIconColorHover: '#1E90F7',
    searchIconColorHover: '#1E90F7',
    cartIconColorHover: '#1E90F7',
    cartIconMargin: '1vmax'
}
const Header = () => {
    return (
        <div>
            <ReactNavbar 
            {...options}
            />
        </div>
    )
}

export default Header;
