import React from 'react';
import './about.css';

const About = () => {
  return (
    <section className="about-container">
      <h2 className="about-header">Our Vibrant Tale</h2>
      <div className="about-section">
        <div className="about-segment">
          <h2 className="segment-header">Our Story</h2>
          <p>
            We are at the beginning of an exciting journey with the launch of our website. Rong Events was born from a passion for event management and a desire to provide unforgettable experiences. Our story is just beginning, and we can't wait to share it with you. Join us as we embark on this adventure, one event at a time.
          </p>
        </div>
        <div className="about-segment">
          <h2 className="segment-header">Our Mission</h2>
          <p>
            At Rong Events, our mission is to bring people together through unforgettable experiences. We strive to create events that leave a lasting impression, connecting individuals and communities. We're dedicated to innovation, quality, and the pursuit of perfection in every event we organize.
          </p>
        </div>
        <div className="about-segment">
          <h2 className="segment-header">Our Team</h2>
          <p>
            Meet the heart and soul of Rong Events – our talented and diverse team. We are event enthusiasts, designers, planners, and creative thinkers. Our collaborative spirit and shared passion for delivering exceptional events set us apart. Together, we transform ideas into reality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
