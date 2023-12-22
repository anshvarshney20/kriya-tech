import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const NavbarD = () => {
    const cookies = new Cookies();
    const navigate = useNavigate()

    const logout = () => {
        cookies.remove('auth');
        navigate('/admin')
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        Creators Dashboard
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* Add any additional navigation links if needed */}
                        </ul>
                        <form className="d-flex">
                            <Link to="/createuser">
                                <button className="btn btn-primary mx-2" type="button">
                                    Create
                                </button>
                            </Link>
                            <button className=" mx-2 " type="button" onClick={logout}>
                                Logout
                            </button>
                            <Link to='/'>
                            <button className="btn btn-info mx-2" type="button">
                                View Site
                            </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavbarD;
