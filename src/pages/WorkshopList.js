import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WorkshopList.css';

const allWorkshops = [
  {
    id: 1,
    title: 'Python for Beginners',
    category: 'Programming',
    date: 'May 10, 2025',
    location: 'Mumbai, Maharashtra',
    totalSeats: 30,
    bookedSeats: 22,
    instructor: 'Prof. Anil Kumar',
    description: 'Learn Python basics through hands-on exercises designed for absolute beginners.'
  },
  {
    id: 2,
    title: 'Scilab Fundamentals',
    category: 'Computation',
    date: 'May 15, 2025',
    location: 'Pune, Maharashtra',
    totalSeats: 25,
    bookedSeats: 20,
    instructor: 'Prof. Meera Sharma',
    description: 'Explore numerical computing and data visualization using free Scilab software.'
  },
  {
    id: 3,
    title: 'OpenFOAM Basics',
    category: 'Simulation',
    date: 'May 20, 2025',
    location: 'Delhi, NCR',
    totalSeats: 20,
    bookedSeats: 4,
    instructor: 'Prof. Rahul Verma',
    description: 'Introduction to Computational Fluid Dynamics simulation using OpenFOAM.'
  },
  {
    id: 4,
    title: 'Advanced Python',
    category: 'Programming',
    date: 'June 1, 2025',
    location: 'Bangalore, Karnataka',
    totalSeats: 30,
    bookedSeats: 10,
    instructor: 'Prof. Sunita Patel',
    description: 'Deep dive into Python libraries like NumPy, Pandas and Matplotlib.'
  },
  {
    id: 5,
    title: 'DWSIM Process Simulation',
    category: 'Simulation',
    date: 'June 5, 2025',
    location: 'Chennai, Tamil Nadu',
    totalSeats: 20,
    bookedSeats: 18,
    instructor: 'Prof. Karthik Rajan',
    description: 'Learn chemical process simulation using the free DWSIM software.'
  },
  {
    id: 6,
    title: 'PHP & MySQL',
    category: 'Web',
    date: 'June 10, 2025',
    location: 'Hyderabad, Telangana',
    totalSeats: 25,
    bookedSeats: 8,
    instructor: 'Prof. Deepa Nair',
    description: 'Build dynamic web applications using PHP and MySQL database.'
  }
];

const categories = ['All', 'Programming', 'Computation', 'Simulation', 'Web'];

function WorkshopList() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allWorkshops.filter((w) => {
    const matchCategory = activeCategory === 'All' || w.category === activeCategory;
    const matchSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getSeatsColor = (booked, total) => {
    const remaining = total - booked;
    if (remaining <= 5) return '#DC2626';
    if (remaining <= 10) return '#F59E0B';
    return '#16A34A';
  };

  const getSeatsLabel = (booked, total) => {
    const remaining = total - booked;
    if (remaining <= 5) return `⚠️ Only ${remaining} left`;
    if (remaining <= 10) return `🟡 ${remaining} remaining`;
    return `✅ ${remaining} available`;
  };

  return (
    <main id="main-content">
      <section className="wl-hero" aria-label="Workshops header">
        <div className="container">
          <h1 className="wl-title">All Workshops</h1>
          <p className="wl-subtitle">
            Browse and book free workshops happening across India.
          </p>

          <div className="wl-search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="search"
              className="wl-search"
              placeholder="Search by workshop name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search workshops"
            />
          </div>
        </div>
      </section>

      <section className="wl-body" aria-label="Workshop listings">
        <div className="container">

          <div className="wl-filters" role="tablist" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="wl-count">
            Showing <strong>{filtered.length}</strong> workshops
          </p>

          {filtered.length === 0 ? (
            <div className="wl-empty">
              <p>😕 No workshops found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="wl-grid">
              {filtered.map((workshop) => (
                <article className="wl-card" key={workshop.id}>
                  <div className="wl-card-header">
                    <span className="wl-category">{workshop.category}</span>
                    <span
                      className="wl-seats-badge"
                      style={{ color: getSeatsColor(workshop.bookedSeats, workshop.totalSeats) }}
                    >
                      {getSeatsLabel(workshop.bookedSeats, workshop.totalSeats)}
                    </span>
                  </div>

                  <h2 className="wl-card-title">{workshop.title}</h2>
                  <p className="wl-card-desc">{workshop.description}</p>

                  <div className="wl-card-meta">
                    <span>📅 {workshop.date}</span>
                    <span>📍 {workshop.location}</span>
                    <span>👨‍🏫 {workshop.instructor}</span>
                  </div>

                  <div className="wl-seats-track">
                    <div
                      className="wl-seats-fill"
                      style={{
                        width: `${(workshop.bookedSeats / workshop.totalSeats) * 100}%`,
                        backgroundColor: getSeatsColor(workshop.bookedSeats, workshop.totalSeats)
                      }}
                      role="progressbar"
                      aria-valuenow={workshop.bookedSeats}
                      aria-valuemax={workshop.totalSeats}
                      aria-label={`${workshop.bookedSeats} of ${workshop.totalSeats} seats booked`}
                    ></div>
                  </div>

                  <Link to="/book" className="btn-primary wl-book-btn">
                    Book This Workshop
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default WorkshopList;