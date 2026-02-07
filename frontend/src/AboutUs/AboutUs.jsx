import React from 'react'
import '../AboutUs/AboutUs.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'

export default function AboutUs() {
    return (
        <>
            <Navbar />
            <PageTitle title="About Us" />

            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>Making Everyday Shopping Simple & Reliable</h1>
                    <p>
                        We are a customer-first e-commerce platform committed to delivering
                        premium products, seamless shopping experiences, and trusted service.
                    </p>
                </div>
            </section>

            <section className="about-container">
                <div className="about-grid">
                    <div className="about-text">
                        <h2>Who We Are</h2>
                        <p>
                            We started with a simple idea — make online shopping easy, reliable,
                            and enjoyable. Today, we serve thousands of customers by offering
                            carefully curated products that meet high standards of quality
                            and value.
                        </p>
                        <p>
                            Our platform is built to ensure smooth navigation, secure payments,
                            and fast delivery, so you can shop with complete confidence.
                        </p>
                    </div>

                    <div className="about-image">
                        <img
                            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
                            alt="Ecommerce shopping"
                        />
                    </div>
                </div>

                <div className="about-grid reverse">
                    <div className="about-image">
                        <img
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
                            alt="Customer satisfaction"
                        />
                    </div>

                    <div className="about-text">
                        <h2>What We Offer</h2>
                        <p>
                            From everyday essentials to premium selections, our catalog is
                            designed to meet diverse needs. Every product goes through
                            quality checks to ensure reliability and satisfaction.
                        </p>
                        <ul>
                            <li>Wide range of trusted products</li>
                            <li>Secure and easy checkout</li>
                            <li>Fast and reliable delivery</li>
                            <li>Dedicated customer support</li>
                        </ul>
                    </div>
                </div>

                <div className="about-cards">
                    <div className="about-card">
                        <h3>Our Mission</h3>
                        <p>
                            To deliver quality products at the best prices while maintaining
                            transparency, trust, and customer satisfaction.
                        </p>
                    </div>

                    <div className="about-card">
                        <h3>Our Vision</h3>
                        <p>
                            To become a trusted e-commerce destination where customers feel
                            confident, valued, and inspired to shop again.
                        </p>
                    </div>

                    <div className="about-card">
                        <h3>Why Choose Us</h3>
                        <p>
                            Premium quality, reliable service, and a customer-first mindset
                            set us apart in the online marketplace.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
