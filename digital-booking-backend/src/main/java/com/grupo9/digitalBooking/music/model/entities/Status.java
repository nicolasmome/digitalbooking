package com.grupo9.digitalBooking.music.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import javax.persistence.*;

@Getter
@Setter
@Entity
@Table (name="status")
public class Status {

    @Id
    @SequenceGenerator(name = "status_sequence", sequenceName = "status_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "status_sequence")
    private Long id;
    private String name;


    @OneToMany(mappedBy = "status")
    @JsonIgnore
    private Set<Booking> booking;

    @OneToMany(mappedBy = "status")
    @JsonIgnore
    private  Set<Instrument> instrument;


}
