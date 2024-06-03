import React from 'react';
import '../style/about-us.css';
import about from "../assets/Images/team.jpg";
import Navbar from "../components/Navbar";
import team1 from "../assets/Images/team1.jpg";
import team2 from "../assets/Images/team2.jpg";

const AboutUs = () => {
  return (<>
  <Navbar/>
    <div className="about-us">
      <section className="hero-section-about">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </section>

      <section className="about-company">
        <div className="about-company-content">
          <div className="about-company-text">
            <h2>About Company</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="company-image">
            <img src={about} alt="Company" />
          </div>
        </div>
      </section>

      <section className="unique-factors">
        <h2>Company Unique Factor</h2>
        <div className="factors-grid">
          <div className="factor">
            <img src="path/to/icon1.png" alt="Unique Factor 1" />
            <p>Unique Factor 1</p>
          </div>
          <div className="factor">
            <img src="path/to/icon2.png" alt="Unique Factor 2" />
            <p>Unique Factor 2</p>
          </div>
          <div className="factor">
            <img src="path/to/icon3.png" alt="Unique Factor 3" />
            <p>Unique Factor 3</p>
          </div>
          <div className="factor">
            <img src="path/to/icon4.png" alt="Unique Factor 4" />
            <p>Unique Factor 4</p>
          </div>
        </div>
      </section>

      <section className="meet-team">
        <h2>Meet Our Team</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className="team-grid">
          <div className="team-member">
            <img src={team1}  alt="Devin Johnson" />
            <h3>Devin Johnson</h3>
            <p>Chief Executive Officer</p>
            <a href="https://www.linkedin.com/in/devin-johnson">
              <img src="path/to/linkedin-icon.png" alt="LinkedIn" />
            </a>
          </div>
          <div className="team-member">
            <img src={team1}  alt="Cody Harvey" />
            <h3>Cody Harvey</h3>
            <p>President / Chief Strategy Officer</p>
            <a href="https://www.linkedin.com/in/cody-harvey">
              <img src="path/to/linkedin-icon.png" alt="LinkedIn" />
            </a>
          </div>
          <div className="team-member">
            <img src={team1}  alt="Elliot Drake" />
            <h3>Elliot Drake</h3>
            <p>Chief Marketing Officer</p>
            <a href="https://www.linkedin.com/in/elliot-drake">
              <img src="path/to/linkedin-icon.png" alt="LinkedIn" />
            </a>
          </div>
          <div className="team-member">
            <img src={team1}  alt="Stephen Twomey" />
            <h3>Stephen Twomey</h3>
            <p>Chief Technology Officer</p>
            <a href="https://www.linkedin.com/in/stephen-twomey">
              <img src="path/to/linkedin-icon.png" alt="LinkedIn" />
            </a>
          </div>
          <div className="team-member">
            <img src={team2} alt="Brandon Poplstein" />
            <h3>Brandon Poplstein</h3>
            <p>Chief Operating Officer</p>
            <a href="https://www.linkedin.com/in/brandon-poplstein">
              <img src="path/to/linkedin-icon.png" alt="LinkedIn" />
            </a>
          </div>
          <div className="team-member">
            <img src={team1} alt="John Doe" />
            <h3>John Doe</h3>
            <p>Chief Marketing Officer</p>
            <a href="https://www.linkedin.com/in/john-doe">
              <img src="path/to/linkedin-icon.png" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutUs;
