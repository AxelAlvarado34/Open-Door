import { Link } from "react-router-dom";
import Squares from "../components/atoms/Squares";
import styles from "../styles/LandingPage.module.css";
import { Fade } from "react-awesome-reveal";
import { TiHome } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import ClientsCarousel from "../components/atoms/ClientsCarousel";
import CountUp from "../components/atoms/CountUp";
import Footer from "../components/Footer";

export default function LandingPage() {
    return (
        <>
            <header className={styles.section} id="home">
                <div className={styles.background}>
                    <Squares
                        direction="diagonal"
                        speed={0.2}
                        borderColor="#f0f0f0"
                        squareSize={40}
                        hoverFillColor="#eeeeee"
                    />
                </div>
                <div className={styles.content}>

                    <div className={styles.content_nav}>
                        <nav className={styles.navbar}>
                            <div className={styles.logo}>
                                <img src="./homeLogo.png" alt="home-logo" />
                                <p className={styles.logo_title}>openDoor</p>
                            </div>

                            <ul className={styles.navLinks}>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#key">Features</a></li>
                                <li><a href="#clients">Clients</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>

                            <Link to={'/opendoor/home'} className={styles.btnGetStarted}>Get started for free</Link>
                        </nav>
                    </div>

                    <div className={styles.content_text}>
                        <Fade className="w-full" direction="up" triggerOnce={true} delay={200}>
                            <h1 className={styles.title}>
                                Where Your Vision of the Perfect
                            </h1>
                            <h1 className={styles.title}>
                                Home Becomes a Reality
                            </h1>
                        </Fade>

                        <Fade direction="up" triggerOnce={true} delay={600} className={styles.sub_cont}>
                            <p className={styles.subtitle}>
                                Connecting you to quality properties and trusted advice
                                to help you make the best decision for your future home.
                            </p>
                        </Fade>

                        <Fade direction="up" triggerOnce={true} delay={1000} className="transition-all hover:scale-105">
                            <Link
                                to={'/opendoor/home'}
                                className={styles.content_cta}
                            >
                                Get started for free
                            </Link>
                        </Fade>
                    </div>
                </div>
            </header>
            <img src="/banner.webp" alt="homeBanner" className={styles.banner} />

            <section className={styles.features_sec} id="key">
                <p className={styles.feature_intro}>Key Features</p>
                <Fade className="w-full" direction="up" triggerOnce={true} delay={200}>
                    <h3 className={styles.feature_title}>Personalized Recommendations</h3>
                </Fade>
                <Fade direction="up" triggerOnce={true} delay={600}>
                    <p className={styles.feature_sub_title}>
                        Receive personalized property recommendations carefully
                        curated to match your unique preferences, lifestyle needs, and budget constraints,
                        ensuring you find the perfect home that truly feels like yours.</p>
                </Fade>

                <div className={styles.feature_cards}>

                    <Fade direction="up" triggerOnce={true}>
                        <div className={styles.feature_card}>
                            <div className={styles.feature_img_cont}>
                                <TiHome className={styles.feature_icon} />
                            </div>

                            <p className={styles.feature_card_title}>
                                Extensive Property Listings
                            </p>

                            <p className={styles.feature_card_desc}>
                                Explore thousands of verified homes, apartments, and commercial spaces
                                across multiple neighborhoods, updated daily to give you the freshest options.
                            </p>
                        </div>
                    </Fade>
                    {/* 2 */}
                    <Fade direction="up" triggerOnce={true} delay={200}>
                        <div className={`${styles.feature_card} ${styles.feature_card_dark}`}>
                            <div className={`${styles.feature_img_cont} ${styles.feature_img_cont_dark}`}>
                                <IoSearch className={`${styles.feature_icon} ${styles.feature_icon_dark}`} />
                            </div>

                            <p className={styles.feature_card_title}>
                                Trusted Local Agents
                            </p>

                            <p className={styles.feature_card_desc}>
                                Connect with experienced, professional real estate agents in your area who provide
                                personalized guidance and support throughout the buying or renting process.
                            </p>
                        </div>
                    </Fade>
                    {/* 3 */}
                    <Fade direction="up" triggerOnce={true} delay={400}>
                        <div className={styles.feature_card}>
                            <div className={styles.feature_img_cont}>
                                <MdOutlineWork className={styles.feature_icon} />
                            </div>

                            <p className={styles.feature_card_title}>
                                Seamless Search Experience
                            </p>

                            <p className={styles.feature_card_desc}>
                                Filter, sort, and compare properties effortlessly with powerful 
                                search tools designed to save you time.
                            </p>
                        </div>
                    </Fade>
                </div>


                <Fade direction="up" triggerOnce={true}>
                    <Link
                        to={'/opendoor/home'}
                        className={styles.content_cta}
                    >
                        Get started for free
                    </Link>
                </Fade>
            </section>

            <div className={styles.clients_section} id="clients">
                <p className={`${styles.feature_intro} w-full text-center`}>Clients</p>
                <Fade className="w-full" direction="up" triggerOnce={true} delay={200}>
                    <h3 className={`${styles.feature_title} ${styles.feature_title_client}`}>
                        What Our Clients Are Saying
                    </h3>
                </Fade>
                <Fade direction="up" triggerOnce={true} delay={600}>
                    <p className={styles.feature_sub_title}>
                        Hear directly from our satisfied clients who
                        found their dream homes with us. We pride ourselves on personalized service,
                        trust, and results that speak for themselves.
                    </p>
                </Fade>
                <ClientsCarousel />
            </div>

            <div className={styles.number_section}>
                <div className={styles.number_item}>
                    <div className={styles.number}>
                        <CountUp
                            from={0}
                            to={2}
                            separator=","
                            direction="up"
                            duration={1}
                            className="count-up-text"
                        />
                        <p>k+</p>
                    </div>
                    <div className={styles.number_text}>
                        Community Members
                    </div>
                </div>

                <div className={styles.number_item}>
                    <div className={styles.number}>
                        <CountUp
                            from={0}
                            to={50}
                            separator=","
                            direction="up"
                            duration={1}
                            className="count-up-text"
                        />
                        <p>k+</p>
                    </div>
                    <div className={styles.number_text}>
                        Properties
                    </div>
                </div>

                <div className={styles.number_item}>
                    <div className={styles.number}>
                        <CountUp
                            from={0}
                            to={8}
                            separator=","
                            direction="up"
                            duration={1}
                            className="count-up-text"
                        />
                        <p></p>
                    </div>
                    <div className={styles.number_text}>
                        Years
                    </div>
                </div>
            </div>
            <div className="p-3">
                <Footer/>
            </div>
        </>
    );
}
