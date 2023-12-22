import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Pricing = () => {
    return (
        <>
        <Navbar/>
            <div className="hero-section inner-page">
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
                                    <h1 data-aos="fade-up" data-aos-delay="">Our Pricing</h1>
                                    <p className="mb-5" data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-md-7 mb-5">
                            <h2 className="section-heading">Choose A Plan</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere illum obcaecati inventore velit laborum earum.</p>
                        </div>
                    </div>
                    <div className="row align-items-stretch">
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <div className="pricing h-100 text-center">
                                <span>&nbsp;</span>
                                <h3>Basic</h3>
                                <ul className="list-unstyled">
                                    <li>Create up to 5 forms</li>
                                    <li>Generate 100 monthly reports</li>
                                </ul>
                                <div className="price-cta">
                                    <strong className="price">Free</strong>
                                    <p><a href="#" className="btn btn-white">Choose Plan</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <div className="pricing h-100 text-center popular">
                                <span className="popularity">Most Popular</span>
                                <h3>Professional</h3>
                                <ul className="list-unstyled">
                                    <li>Create up to 20 forms</li>
                                    <li>Generate 2500 monthly reports</li>
                                    <li>Manage a team of up to 5 people</li>
                                </ul>
                                <div className="price-cta">
                                    <strong className="price">$9.95/month</strong>
                                    <p><a href="#" className="btn btn-white">Choose Plan</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <div className="pricing h-100 text-center">
                                <span className="popularity">Best Value</span>
                                <h3>Ultimate</h3>
                                <ul className="list-unstyled">
                                    <li>Create up to 20 forms</li>
                                    <li>Generate 2500 monthly reports</li>
                                    <li>Manage a team of up to 5 people</li>
                                </ul>
                                <div className="price-cta">
                                    <strong className="price">$199.95/month</strong>
                                    <p><a href="#" className="btn btn-white">Choose Plan</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Pricing;
