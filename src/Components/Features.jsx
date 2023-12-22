import React from 'react';
import Section from '../Pages/Section';
import Navbar from './Navbar';
import Footer from './Footer';

const Features = () => {
    return (
        <>
        <Navbar/>
            <section className="hero-section inner-page">
                <div className="wave">
                    <svg width="1920px" height="265px" viewBox="0 0 1920 265" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Apple-TV" transform="translate(0.000000, -402.000000)" fill="#FFFFFF">
                                <path d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,667 L1017.15166,667 L0,667 L0,439.134243 Z" id="Path"></path>
                            </g>
                        </g>
                    </svg>
                </div>

                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-md-7 text-center hero-text">
                                    <h1 data-aos="fade-up" data-aos-delay="">SoftLand Features</h1>
                                    <p className="mb-5" data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Section />
            <Footer/>
        </>
    );
}

export default Features;
