package com.grupo9.digitalBooking.music.model.controller;


import com.grupo9.digitalBooking.music.model.DTO.BookingDTO;
import com.grupo9.digitalBooking.music.model.DTO.BookingResponseDTO;
import com.grupo9.digitalBooking.music.model.DTO.CategoryDTO;
import com.grupo9.digitalBooking.music.model.entities.Booking;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Set;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    IBookingService bookingService;

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The Reservation already exists");

        BookingResponseDTO newBooking = bookingService.createBooking(bookingDTO);
        if(newBooking != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(newBooking);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Long id){

        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The Reservation with " + id + " does not exist");

        BookingResponseDTO bookingResponseDTO = bookingService.readBooking(id);
        if(bookingResponseDTO != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(bookingResponseDTO);
        }
        return response;

    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PutMapping
    public ResponseEntity<?> modifyBooking(@RequestBody BookingDTO bookingDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The Reservation with " + bookingDTO.getId() + " does not exist");

        BookingResponseDTO bookingResponseDTO = bookingService.modifyBooking(bookingDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeBooking(@PathVariable Long id) {
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The Reservation with " + id + " does not exist");
        Boolean wasDelete = bookingService.removeBooking(id);
        if(wasDelete) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body("Message: Booking was delete");
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping
    public ResponseEntity<?> getallBookings(){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: There are not information");
        Set<BookingResponseDTO> reservations = bookingService.getAll();
        if(reservations.size() > 0) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(reservations);
        }
        return response;
    }
}
