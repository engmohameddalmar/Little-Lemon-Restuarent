import { Link } from "react-router-dom";

function ConfirmedBooking() {
  return (
    <main className="confirmed-booking">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>

        <h3>Booking Confirmed!</h3>

        <p>
          Your reservation at Little Lemon has been
          successfully confirmed.
        </p>

        <Link to="/" className="primary-button">
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default ConfirmedBooking;