import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <Link to="/">Haber Listesi</Link>
            {" | "}
            <Link to="/new">Yeni Haber</Link>
        </nav>
    )
}

export default NavBar;