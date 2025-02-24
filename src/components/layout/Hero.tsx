// src/components/Hero.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-gradient"></div>
                <div className="hero-pattern"></div>
            </div>

            <div className="hero-content">
                <div className="hero-grid-container">
                    <div className="hero-text">
                        <div className="hero-title">
                            <span className="greeting">Hello, I'm</span>
                            <h1>Tygrus</h1>
                            <span className="role">Security Expert & Developer</span>
                        </div>
                        <p className="hero-description">
                            專注於軟體開發與資安領域，擁有多張國際認證。
                            致力於將安全性融入開發流程，打造更安全且穩定的軟體系統。
                        </p>

                        <div className="hero-cta">
                            <a href="#projects" className="btn primary">
                                View Projects
                            </a>
                            <a href="#contact" className="btn secondary">
                                Contact Me
                            </a>
                        </div>

                        <div className="social-links">
                            <a href="https://github.com/Lung-Yu"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="https://www.linkedin.com/in/lung-yu-tsai-633865100/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a href="mailto:workfile975@gmail.com"
                                aria-label="Email">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </a>
                        </div>
                    </div>

                    <div className="hero-image">
                        <div className="image-backdrop"></div>
                        <img src="/src/assets/images/aboutme/profile.png" alt="Tygrus" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;