package com.grupo9.digitalBooking.music.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.OneToMany;
import java.util.Set;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table (name="instrumentDetail")

public class InstrumentDetail {

    @Id
    @SequenceGenerator(name = "instrument_Detail_sequence", sequenceName = "instrument_Detail_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "instrument_Detail_sequence")
    private Long id;
    private String description;

    @OneToMany(mappedBy = "instrumentDetail")
    @JsonIgnore
    private Set<Instrument> instrument;


}
