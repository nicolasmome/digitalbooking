package com.grupo9.digitalBooking.music.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


import javax.persistence.*;

@Getter
@Setter
@Entity
@Table (name="image")

public class Image {

    @Id
    @SequenceGenerator(name = "image_sequence", sequenceName = "image_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "image_sequence")
    private Long id;
    private String name;
    private String url;

    @JsonIgnore
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne
    private Instrument instrument;
    //@JoinColumn(name = "instrument_id", nullable = false)

}
