
import { useState, useEffect } from "react";

function BookingForm({
    availableTimes,
    dispatch,
    submitForm
}) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("17:00");
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState("Birthday");

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (availableTimes.length > 0) {
            setTime(availableTimes[0]);
        }
    }, [availableTimes]);

    function handleDateChange(event) {
        const selectedDate = event.target.value;

        setDate(selectedDate);

        // Ask Main to update available times
        dispatch(selectedDate);

        setMessage("");
    }
    
    function handleSubmit(event) {
        event.preventDefault();

        if (!date) {
            setMessage("Please choose a reservation date.");
            return;
        }

        const formData = {
            date,
            time,
            guests,
            occasion,
        };

        submitForm(formData);
    }

    return (
        <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="res-date">Choose date</label>

                <input
                    type="date"
                    id="res-date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleDateChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="res-time">Choose time</label>

                <select
                    id="res-time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required
                >
                    {availableTimes.map((availableTime) => (
                        <option key={availableTime} value={availableTime}>
                            {availableTime}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="guests">Number of guests</label>

                <input
                    type="number"
                    id="guests"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(event) => setGuests(Number(event.target.value))}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="occasion">Occasion</label>

                <select
                    id="occasion"
                    value={occasion}
                    onChange={(event) => setOccasion(event.target.value)}
                    required
                >
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                </select>
            </div>

            <button type="submit" className="primary-button submit-button">
                Make Your Reservation
            </button>

            {message && (
                <p className="reservation-message" role="status">
                    {message}
                </p>
            )}
        </form>
    );
}

export default BookingForm;
