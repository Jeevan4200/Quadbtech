import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

function Navbar() {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems, user, logout } = useContext(ShopContext);

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" className="logo" />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("Men") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Mens</Link> {menu === "Men" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("Women") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Womens</Link> {menu === "Women" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("Kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link> {menu === "Kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {user ? ( // Check if user is logged in
                    <>
                        <button onClick={logout}>Logout</button> {/* Logout button */}
                        <Link style={{ textDecoration: 'none' }} to='/cart'><img src={cart_icon} alt="" /></Link>
                        <div className="nav-login-count">{getTotalCartItems()}</div>
                    </>
                ) : (
                    <Link style={{ textDecoration: 'none' }} to='/login'><button>Login</button></Link>
                )}
            </div>
        </div>
    )
}

export default Navbar;
