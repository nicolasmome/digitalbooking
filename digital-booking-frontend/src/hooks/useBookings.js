import { useState, useEffect } from "react";
import BookingService from "../services/booking";
import { useApp } from "../context/AppContext";

const useBookings = ({ id } = {}) => {
  const { user } = useApp();
  const { token } = user;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = [];
      if (id) {
        data = await BookingService.getBookingById(id, { token });
      } else {
        data = await BookingService.getAllBookings({ token });
      }
      setBookings(data);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createBooking = (booking) => {
    return BookingService.createBooking(booking, { token });
  };

  const updateBooking = (booking) => {
    return BookingService.updateBooking(booking, { token });
  };

  const deleteBooking = (bookingId) => {
    return BookingService.deleteBooking(bookingId, { token });
  };

  return {
    bookings,
    setBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    loading,
    errors,
  };
};

export default useBookings;
