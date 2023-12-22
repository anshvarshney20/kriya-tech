import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Section = () => {
    return (
        <>
            <section class="section">

                <div class="container">
                    <div class="row justify-content-center text-center mb-5" data-aos="fade">
                        <div class="col-md-6 mb-5">
                            <img src="assets/img/undraw_svg_1.svg" alt="Image" class="img-fluid" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="step">
                                <span class="number">01</span>
                                <h3>Sign Up</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="step">
                                <span class="number">02</span>
                                <h3>Create Profile</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="step">
                                <span class="number">03</span>
                                <h3>Enjoy the app</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, optio.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section class="section">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-4 me-auto">
                            <h2 class="mb-4">Seamlessly Communicate</h2>
                            <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur at reprehenderit optio,
                                laudantium eius quod, eum maxime molestiae porro omnis. Dolores aspernatur delectus impedit incidunt
                                dolore mollitia esse natus beatae.</p>
                            <p><a href="#" class="btn btn-primary">Download Now</a></p>
                        </div>
                        <div class="col-md-6" data-aos="fade-left">
                            <img src="assets/img/undraw_svg_2.svg" alt="Image" class="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-4 ms-auto order-2">
                            <h2 class="mb-4">Gather Feedback</h2>
                            <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur at reprehenderit optio,
                                laudantium eius quod, eum maxime molestiae porro omnis. Dolores aspernatur delectus impedit incidunt
                                dolore mollitia esse natus beatae.</p>
                            <p><a href="#" class="btn btn-primary">Download Now</a></p>
                        </div>
                        <div class="col-md-6" data-aos="fade-right">
                            <img src="assets/img/undraw_svg_3.svg" alt="Image" class="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>
       </>
    )
}

export default Section