
import "./App.css";
import BookingForm from "./BookingForm";
import { useReducer } from "react";
import { fetchAPI } from "./api";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import ConfirmedBooking from "./ConfirmedBooking";
import { submitAPI } from "./api";

const dishes = [
  {
    name: "Greek Salad",
    price: "$12.99",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800",
    description:
      "Fresh tomatoes, cucumber, olives, and feta cheese served with our homemade dressing.",
  },
  {
    name: "Bruschetta",
    price: "$7.99",
    image:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800",
    description:
      "Grilled bread topped with fresh tomatoes, basil, garlic, and extra virgin olive oil.",
  },
  {
    name: "Lemon Dessert",
    price: "$5.99",
    image:
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800",
    description:
      "A delicious homemade lemon dessert with a refreshing citrus flavor.",
  },
];

function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🍋</span>
          Little Lemon
        </Link>

        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/#about">About</Link>
          <Link to="/#menu">Menu</Link>
          <Link to="/booking">Reservations</Link>
          <Link to="/#order">Order Online</Link>
          <Link to="/#login">Login</Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>

          <p>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>

          <Link to="/booking" className="primary-button">
            Reserve a Table
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1000"
            alt="Fresh Mediterranean food"
          />
        </div>
      </div>
    </section>
  );
}

function Specials() {
  return (
    <section className="specials section-container" id="menu">
      <div className="section-heading">
        <div>
          <h2>This week's specials!</h2>
          <p>Discover our delicious Mediterranean dishes.</p>
        </div>

        <Link to="/booking" className="secondary-button">
          Order Online
        </Link>
      </div>

      <div className="dish-grid">
        {dishes.map((dish) => (
          <article className="dish-card" key={dish.name}>
            <img src={dish.image} alt={dish.name} />

            <div className="dish-content">
              <div className="dish-title">
                <h3>{dish.name}</h3>
                <span>{dish.price}</span>
              </div>

              <p>{dish.description}</p>

              <Link to="/booking" className="order-link">
                Order a delivery →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      name: "Sarah",
      rating: "★★★★★",
      comment: "Amazing food and a wonderful atmosphere. I will definitely come back!",
    },
    {
      name: "Michael",
      rating: "★★★★★",
      comment: "The Greek salad was fresh and delicious. Highly recommended.",
    },
    {
      name: "Emily",
      rating: "★★★★★",
      comment: "Friendly service and beautiful Mediterranean dishes.",
    },
    {
      name: "James",
      rating: "★★★★★",
      comment: "A lovely restaurant with excellent food and great value.",
    },
  ];

  return (
    <section className="testimonials">
      <div className="section-container">
        <h2>What our customers say</h2>

        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="stars">{review.rating}</div>
              <h3>{review.name}</h3>
              <p>{review.comment}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-container" id="about">
      <div className="about-content">
        <h2>Little Lemon</h2>
        <h3>Chicago</h3>

        <p>
          Little Lemon is a family-owned Mediterranean restaurant located
          in Chicago. Our passion is bringing people together through
          delicious food, fresh ingredients, and warm hospitality.
        </p>

        <p>
          Our chefs prepare traditional recipes with a modern twist,
          creating memorable experiences for every guest.
        </p>
      </div>

      <div className="about-images">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800"
          alt="Restaurant dining area"
        />
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
          alt="Restaurant food presentation"
        />
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Specials />
      <Testimonials />
      <About />
    </>
  );
}


function BookingPage({
  availableTimes,
  dispatch,
  submitForm
}) {
  return (
    <main className="booking-page">
      <div className="booking-container">
        <div className="booking-intro">
          <span className="booking-eyebrow">
            LITTLE LEMON · CHICAGO
          </span>

          <h1>Reserve Your Table</h1>

          <p>
            Enjoy an unforgettable Mediterranean dining experience.
            Choose your preferred date, time, and occasion below.
          </p>
        </div>

        <div className="booking-layout">
          <div className="booking-image">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000"
              alt="Restaurant dining table"
            />

            <div className="booking-image-caption">
              <h2>A table is waiting for you.</h2>
              <p>Fresh ingredients. Great food. Beautiful moments.</p>
            </div>
          </div>

          <div className="booking-form-wrapper">
            <h2>Your Reservation</h2>

            <p className="form-description">
              Complete the details to request your table.
            </p>

            <BookingForm
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          </div>
        </div>
      </div>
    </main>
  );
}


function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span>🍋</span>
          <h2>Little Lemon</h2>
          <p>Fresh Mediterranean food, made with love.</p>
        </div>

        <div>
          <h3>Navigation</h3>
          <Link to="/">Home</Link>
          <Link to="/#about">About</Link>
          <Link to="/#menu">Menu</Link>
          <Link to="/booking">Reservations</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Chicago, Illinois</p>
          <p>hello@littlelemon.com</p>
          <p>+1 312 555 0199</p>
        </div>
      </div>

      <div className="copyright">
        © {new Date().getFullYear()} Little Lemon. All rights reserved.
      </div>
    </footer>
  );
}

// Initialize available times when the application loads
function initializeTimes() {
  return fetchAPI(new Date());
}

// Update available times when the user selects a date
function updateTimes(state, selectedDate) {
  const date = new Date(`${selectedDate}T00:00:00`);

  return fetchAPI(date);
}

function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  const navigate = useNavigate();

  function submitForm(formData) {
    const response = submitAPI(formData);

    if (response) {
      navigate("/booking-confirmed");
    }
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/booking"
        element={
          <BookingPage
            availableTimes={availableTimes}
            dispatch={dispatch}
            submitForm={submitForm}
          />
        }
      />

      <Route
        path="/booking-confirmed"
        element={<ConfirmedBooking />}
      />

      <Route
        path="*"
        element={
          <main className="not-found">
            <h1>404 - Page Not Found</h1>
            <Link to="/" className="primary-button">
              Return Home
            </Link>
          </main>
        }
      />
    </Routes>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  );
}
