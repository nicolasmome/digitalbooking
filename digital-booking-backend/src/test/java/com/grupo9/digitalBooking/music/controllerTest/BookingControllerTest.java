package com.grupo9.digitalBooking.music.controllerTest;

import com.grupo9.digitalBooking.music.model.DTO.BookingDTO;
import com.grupo9.digitalBooking.music.model.DTO.BookingResponseDTO;
import com.grupo9.digitalBooking.music.model.controller.BookingController;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IBookingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class BookingControllerTest {
    @Mock
    private IBookingService bookingService;

    @InjectMocks
    private BookingController bookingController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createBooking_ValidBooking_ReturnsOkResponse() {
        // Arrange
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(1L);
        bookingDTO.setStartDate(LocalDate.now());
        bookingDTO.setFinalDate(LocalDate.now().plusDays(1));

        BookingResponseDTO bookingResponseDTO = new BookingResponseDTO();
        bookingResponseDTO.setId(1L);
        bookingResponseDTO.setStartDate(LocalDate.now());
        bookingResponseDTO.setFinalDate(LocalDate.now().plusDays(1));

        when(bookingService.createBooking(any(BookingDTO.class))).thenReturn(bookingResponseDTO);

        // Act
        ResponseEntity<?> response = bookingController.createBooking(bookingDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(bookingResponseDTO, response.getBody());
    }

    @Test
    void createBooking_ExistingBooking_ReturnsBadRequestResponse() {
        // Arrange
        BookingDTO bookingDTO = new BookingDTO();

        when(bookingService.createBooking(any(BookingDTO.class))).thenReturn(null);

        // Act
        ResponseEntity<?> response = bookingController.createBooking(bookingDTO);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The Reservation already exists", response.getBody());
    }

    @Test
    void getBooking_ExistingId_ReturnsOkResponse() {
        // Arrange
        Long bookingId = 1L;

        BookingResponseDTO bookingResponseDTO = new BookingResponseDTO();
        bookingResponseDTO.setId(bookingId);

        when(bookingService.readBooking(anyLong())).thenReturn(bookingResponseDTO);

        // Act
        ResponseEntity<?> response = bookingController.getBooking(bookingId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(bookingResponseDTO, response.getBody());
    }

    @Test
    void getBooking_NonExistingId_ReturnsBadRequestResponse() {
        // Arrange
        Long bookingId = 1L;

        when(bookingService.readBooking(anyLong())).thenReturn(null);

        // Act
        ResponseEntity<?> response = bookingController.getBooking(bookingId);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The Reservation with " + bookingId + " does not exist", response.getBody());
    }
    @Test
    void modifyBooking_ExistingBooking_ReturnsOkResponse() {
        // Arrange
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(1L);

        when(bookingService.modifyBooking(any(BookingDTO.class))).thenReturn(new BookingResponseDTO());

        // Act
        ResponseEntity<?> response = bookingController.modifyBooking(bookingDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void removeBooking_ExistingBooking_ReturnsOkResponse() {
        // Arrange
        Long bookingId = 1L;

        when(bookingService.removeBooking(anyLong())).thenReturn(true);

        // Act
        ResponseEntity<?> response = bookingController.removeBooking(bookingId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Message: Booking was delete", response.getBody());
    }

    @Test
    void removeBooking_NonExistingBooking_ReturnsNotFoundResponse() {
        // Arrange
        Long bookingId = 1L;

        when(bookingService.removeBooking(anyLong())).thenReturn(false);

        // Act
        ResponseEntity<?> response = bookingController.removeBooking(bookingId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Message: The Reservation with " + bookingId + " does not exist", response.getBody());
    }


@Test
    void getAllBookings_ExistingBookings_ReturnsOkResponse() {
        // Arrange
        BookingResponseDTO bookingResponseDTO = new BookingResponseDTO();
        bookingResponseDTO.setId(1L);

        Set<BookingResponseDTO> bookings = Collections.singleton(bookingResponseDTO);

        when(bookingService.getAll()).thenReturn(bookings);

        // Act
        ResponseEntity<?> response = bookingController.getallBookings();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(bookings, response.getBody());
    }

    @Test
    void getAllBookings_NoBookings_ReturnsBadRequestResponse() {
        // Arrange
        when(bookingService.getAll()).thenReturn(Collections.emptySet());

        // Act
        ResponseEntity<?> response = bookingController.getallBookings();

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: There are not information", response.getBody());
    }
}
