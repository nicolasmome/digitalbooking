package com.grupo9.digitalBooking.music.model.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table (name="booking")
public class Booking {

    @Id
    @SequenceGenerator(name = "booking_sequence", sequenceName = "booking_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "booking_sequence")
    private Long id;
    private LocalDate startDate;
    private LocalDate finalDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserApp userApp;
    @ManyToOne
    @JoinColumn(name = "instrument_id")
    private Instrument instrument;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;
}
