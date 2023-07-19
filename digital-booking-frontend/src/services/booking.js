import axios from "axios";
import config, { getAuthorizationConfig } from "./config";

class BookingService {
  static async getAllBookings({ token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.get("bookings", newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async getBookingById(bookingId, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.get(`bookings/${bookingId}`, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async createBooking(booking, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.post(`bookings`, booking, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async updateBooking(booking, { token }) {
    const newConfig = getAuthorizationConfig(token);
    return axios.put(`bookings`, booking, newConfig).then((resp) => {
      const { data } = resp;
      return data;
    });
  }

  static async deleteBooking(bookingId) {
    return axios.delete(`bookings/${bookingId}`, config).then((resp) => {
      const { data } = resp;
      return data;
    });
  }
}

export default BookingService;
