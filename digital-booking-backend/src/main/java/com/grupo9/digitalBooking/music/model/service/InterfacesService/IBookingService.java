package com.grupo9.digitalBooking.music.model.service.InterfacesService;

import com.grupo9.digitalBooking.music.model.DTO.BookingDTO;
import com.grupo9.digitalBooking.music.model.DTO.BookingResponseDTO;
import com.grupo9.digitalBooking.music.model.entities.Booking;

import java.util.Set;

public interface IBookingService {

    BookingResponseDTO createBooking(BookingDTO bookingDTO);
    BookingResponseDTO readBooking(Long id);
    BookingResponseDTO modifyBooking(BookingDTO bookingDTO);
    Boolean removeBooking(Long id);
    Set<BookingResponseDTO> getAll();
}
