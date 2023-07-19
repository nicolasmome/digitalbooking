package com.grupo9.digitalBooking.music.model.DTO;

import com.grupo9.digitalBooking.music.model.entities.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.sql.In;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class InstrumentDTO {

    private Long id;
    private String name;
    private Double price;
    private String description;
    private Boolean available;

    private String characteristics;
    private Integer stock;
    private Category category;
    private Brand brand;
    private InstrumentDetail instrumentDetail;
    private Status status;
    private Set<Booking> bookings;
    private List<ImageDTO> images;
    private Branch branch;

    private LocalDate startReservationDate;
    private LocalDate endReservationDate;



}
