import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css'; // Make sure to import the CSS

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.addEventListener('load', Aos.refresh);
        return () => window.removeEventListener('load', Aos.refresh);
    }, []);

    return (
        <>
            <header>
                <section>
                    <div className='row'>
                        <div className='flex headerNotlog'>
                            <h1 className="logoText"><Link to="/">Gatherly</Link></h1>
                            <nav>
                                <ul>
                                    <li><Link to="/login" style={{ fontSize: '20px' }}>Log in</Link></li>
                                    <li><Link to="/register" className='button'>Sign up</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
            </header>

            <main>
                {/* HERO SECTION */}
                <section className='mb-[300px] mt-[100px]' data-aos="fade-right" data-aos-delay="200">
                    <div className="row mb-60">
                        <div className="flex revCol">
                            <div>
                                <h2 className="fr-h2 text-6xl mb-5">
                                    <span>Gather</span>, Organize<br />
                                    and Grow <span>Closer</span>
                                </h2>
                                <p className="text-xl">Effortlessly manage family events, chores, and memories in one place.</p>
                                <Link to="/register" className="button">Join Family</Link>
                            </div>
                            <div>
                                <img src="/assets/images/Social life.gif" alt="Login Illustration" className="w-[600px]" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SHARED SHOPPING LIST FEATURE SECTION */}
                <section className='mb-[200px]' data-aos="fade-left" data-aos-delay="100">
                    <div className="row mb-60">
                        <div className="flex">
                            <div>
                                <img src="/assets/images/Group discussion.gif" alt="Shared Shopping List" className="w-[800px]" />
                            </div>
                            <div>
                                <h2 className="fr-h2 text-6xl mb-5">Shared <span>Shopping List</span></h2>
                                <p className="text-xl">Add and track items in a shared list so nothing gets missed.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SHARED CALENDAR FEATURE SECTION */}
                <section className='mb-[200px]' data-aos="fade-right">
                    <div className="row mb-40">
                        <div className="flex revCol">
                            <div>
                                <h2 className="text-6xl mb-5 fr-h2">Shared <span>Calendar</span></h2>
                                <p className="text-xl">Schedule and track family events all in one place.</p>
                            </div>
                            <div>
                                <img src="/assets/images/Events.gif" alt="Shared Calendar" className="w-[800px]" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className='flex mx-auto justify-between items-start h-[200px]'>
                <div>
                    <h3 className='text-3xl font-bold mb-4'>Contact Us</h3>
                    <p>gatherly.app@gmail.com</p>
                </div>
                <div>
                    <h3 className='text-3xl font-bold mb-4'>Socials</h3>
                    <p>gatherly.app@gmail.com</p>
                </div>
                <div>
                    <h3 className='text-3xl font-bold mb-4'>Address</h3>
                    <p>Gatherly Co. <br />Ltd 697 Gandara Street <br />Manila, Philippines</p>
                </div>
            </footer>
        </>
    );
};

export default Home;
