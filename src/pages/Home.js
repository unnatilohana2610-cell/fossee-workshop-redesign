import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

  const features = [
    {
      icon: '🧪',
      title: 'Hands-on Learning',
      description: 'Practice with real tools used in engineering and research across India.'
    },
    {
      icon: '🏛️',
      title: 'IIT Bombay Backed',
      description: 'All workshops are designed and delivered by FOSSEE team at IIT Bombay.'
    },
    {
      icon: '📵',
      title: 'No Cost, No Barrier',
      description: 'Every workshop is completely free. Just register and show up ready to learn.'
    },
    {
      icon: '🗺️',
      title: 'Pan India Reach',
      description: 'Workshops held at colleges across every state in India.'
    }
  ];

  const workshops = [
    {
      title: 'Python for Beginners',
      topic: 'Programming',
      date: 'May 10, 2025',
      totalSeats: 30,
      bookedSeats: 22
    },
    {
      title: 'Scilab Fundamentals',
      topic: 'Computation',
      date: 'May 15, 2025',
      totalSeats: 25,
      bookedSeats: 20
    },
    {
      title: 'OpenFOAM Basics',
      topic: 'Simulation',
      date: 'May 20, 2025',
      totalSeats: 20,
      bookedSeats: 4
    }
  ];

  const getSeatsColor = (booked, total) => {
    const remaining = total - booked;
    if (remaining <= 5) return '#DC2626';
    if (remaining <= 10) return '#F59E0B';
    return '#16A34A';
  };

  const getSeatsLabel = (booked, total) => {
    const remaining = total - booked;
    if (remaining <= 5) return `⚠️ Only ${remaining} seats left!`;
    if (remaining <= 10) return `🟡 ${remaining} seats remaining`;
    return `✅ ${remaining} seats available`;
  };

  return (
    <main id="main-content">

      {/* Hero Section */}
      <section className="hero" aria-label="Welcome section">
        <div className="hero-inner container">
          <div className="hero-badge">🇮🇳 Free for all Indian Students</div>
          <h1 className="hero-title">
            Upgrade Your Skills With
            <span className="hero-highlight"> FOSSEE Workshops</span>
          </h1>
          <p className="hero-desc">
            Join thousands of students across India in free, hands-on technical
            workshops conducted by IIT Bombay's FOSSEE team.
          </p>
          <div className="hero-actions">
            <Link to="/workshops" className="btn-primary">
              Explore Workshops
            </Link>
            <Link to="/book" className="btn-outline">
              Book a Workshop
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>500+</strong>
              <span>Workshops Held</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <strong>50,000+</strong>
              <span>Students Trained</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <strong>28</strong>
              <span>States Covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" aria-label="Why choose us">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why FOSSEE Workshops?</h2>
            <p className="section-subtitle">
              Built for students, delivered by experts, free for everyone.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <article className="feature-card" key={index}>
                <div className="feature-icon-wrap">
                  <span role="img" aria-label={feature.title}>
                    {feature.icon}
                  </span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="workshops-section" aria-label="Upcoming workshops">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Upcoming Workshops</h2>
            <p className="section-subtitle">
              Seats fill up fast — book yours before it's too late.
            </p>
          </div>
          <div className="workshops-grid">
            {workshops.map((workshop, index) => (
              <article className="workshop-card" key={index}>
                <div className="workshop-card-top">
                  <span className="workshop-topic">{workshop.topic}</span>
                  <span className="workshop-date">📅 {workshop.date}</span>
                </div>
                <h3 className="workshop-title">{workshop.title}</h3>

                <div className="seats-info">
                  <div className="seats-track">
                    <div
                      className="seats-fill"
                      style={{
                        width: `${(workshop.bookedSeats / workshop.totalSeats) * 100}%`,
                        backgroundColor: getSeatsColor(workshop.bookedSeats, workshop.totalSeats)
                      }}
                      role="progressbar"
                      aria-valuenow={workshop.bookedSeats}
                      aria-valuemax={workshop.totalSeats}
                    ></div>
                  </div>
                  <p
                    className="seats-label"
                    style={{ color: getSeatsColor(workshop.bookedSeats, workshop.totalSeats) }}
                  >
                    {getSeatsLabel(workshop.bookedSeats, workshop.totalSeats)}
                  </p>
                </div>

                <Link to="/book" className="btn-primary workshop-btn">
                  Book This Workshop
                </Link>
              </article>
            ))}
          </div>

          <div className="view-all-wrap">
            <Link to="/workshops" className="view-all-link">
              View all workshops →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" aria-label="Call to action">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to start learning?</h2>
            <p>Join thousands of students who have already boosted their careers through FOSSEE workshops.</p>
            <Link to="/book" className="btn-primary">
              Book Your Free Workshop
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;