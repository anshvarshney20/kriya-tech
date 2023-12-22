import React from 'react';
import Hero from '../Pages/Hero';
import About from '../Pages/About';
import Testimonial from '../Pages/Testimonial';
import CTA from '../Pages/CTA';
import Section from '../Pages/Section';
import Navbar from './Navbar';
const Index = () => {
  return (
    <>
    <Navbar/>
      <Hero />
      <About/>  
      <Section/>
      <Testimonial/>
      <CTA/>
      
    </>
  );
}

export default Index;
