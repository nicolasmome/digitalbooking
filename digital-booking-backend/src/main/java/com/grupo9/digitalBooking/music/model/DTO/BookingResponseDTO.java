package com.grupo9.digitalBooking.music.model.DTO;

import com.grupo9.digitalBooking.music.model.entities.Instrument;
import com.grupo9.digitalBooking.music.model.entities.Status;
import com.grupo9.digitalBooking.music.model.entities.UserApp;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookingResponseDTO {
    private Long id;
    private LocalDate startDate;
    private LocalDate finalDate;
    private UserResponseDTO user;
    private Instrument instrument;
    private Status status;
}
