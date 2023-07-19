package com.grupo9.digitalBooking.music.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo9.digitalBooking.music.model.DTO.BookingDTO;
import com.grupo9.digitalBooking.music.model.DTO.BookingResponseDTO;
import com.grupo9.digitalBooking.music.model.DTO.UserResponseDTO;
import com.grupo9.digitalBooking.music.model.entities.Instrument;
import com.grupo9.digitalBooking.music.model.entities.Status;
import com.grupo9.digitalBooking.music.model.entities.UserApp;
import com.grupo9.digitalBooking.music.model.repository.IInstrument;
import com.grupo9.digitalBooking.music.model.repository.IStatus;
import com.grupo9.digitalBooking.music.model.repository.IUser;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IBookingService;
import com.grupo9.digitalBooking.music.model.entities.Booking;
import com.grupo9.digitalBooking.music.model.repository.IBooking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class BookingService implements IBookingService {

    private final String NOT_AVAILABLE = "no disponible";
    private final String AVAILABLE = "no disponible";

    @Autowired
    private IBooking bookingRepository;
    
    @Autowired
    private IUser userRepository;

    @Autowired
    private IInstrument instrumentRepository;

    @Autowired
    private IStatus statusRepository;

    @Autowired
    ObjectMapper mapper;

    private Booking saveBooking(Booking booking){
        return bookingRepository.save(booking);
    }

    private Boolean existById(Long id) {
        return bookingRepository.findById(id).isPresent();
    }
    @Override
    public BookingResponseDTO createBooking(BookingDTO bookingDTO) {
        UserApp user = userRepository.findUserById(bookingDTO.getUser().getId());
        Booking newBooking = new Booking();
        BookingResponseDTO response = new BookingResponseDTO();

        if (user != null) {
            Instrument instrument = instrumentRepository.findInstrumentById(bookingDTO.getInstrument().getId());
            Status notAvailable = mapper.convertValue(statusRepository.findByName(NOT_AVAILABLE), Status.class);

            Status status = statusRepository.findStatusById(bookingDTO.getStatus().getId());

            newBooking.setStartDate(bookingDTO.getStartDate());
            newBooking.setFinalDate(bookingDTO.getFinalDate());
            newBooking.setInstrument(instrument);
            newBooking.setStatus(status);
            newBooking.setUserApp(user);

            instrument.setStatus(notAvailable);
            instrument.setAvailable(false);
            instrumentRepository.save(instrument);
            newBooking = saveBooking(newBooking);

            response = mapper.convertValue(newBooking, BookingResponseDTO.class);
            response.setUser(mapper.convertValue(newBooking.getUserApp(), UserResponseDTO.class));
        }


        return response;



    }

    @Override
    public BookingResponseDTO readBooking(Long id) {
        Optional<Booking> bookings = bookingRepository.findById(id);
        BookingDTO bookingDTO = null;
        BookingResponseDTO response = new BookingResponseDTO();
        if(bookings.isPresent()) {
            bookingDTO = mapper.convertValue(bookings, BookingDTO.class);
            response = mapper.convertValue(bookingDTO, BookingResponseDTO.class);
        }

        return response;
    }

    @Override
    public BookingResponseDTO modifyBooking(BookingDTO bookingDTO) {
        BookingResponseDTO bookingResponseDTO = null;
        Boolean valditateBooking = existById(bookingDTO.getId());

        if(valditateBooking) {
            Booking booking =  saveBooking(mapper.convertValue(bookingDTO, Booking.class));
            bookingResponseDTO = mapper.convertValue(booking, BookingResponseDTO.class);
        }

        return bookingResponseDTO;

    }

    @Override
    public Boolean removeBooking(Long id) {
        Boolean response = false;
        Boolean exist = existById(id);
        if(exist) {
            bookingRepository.deleteById(id);
            response = true;
        }
        return response;
    }

    @Override
    public Set<BookingResponseDTO> getAll() {
        List<Booking> bookings = bookingRepository.findAll();
        Set<BookingResponseDTO> bookingDTOS = new HashSet<>();

        for (Booking booking1 : bookings) {
            bookingDTOS.add(mapper.convertValue(booking1, BookingResponseDTO.class));
        }

        return bookingDTOS;

    }
}
