package com.grupo9.digitalBooking.music.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name="brand")
public class Brand {

    @Id
    @SequenceGenerator(name = "brand_sequence", sequenceName = "brand_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "brand_sequence")
    private Long id;
    private String name;
    private String image;

    @OneToMany(mappedBy = "brand")
    @JsonIgnore
    private Set<Instrument> instrument;

    @Override
    public String toString() {
        return "Brand{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", icon='" + image + '\'' +
                ", instrument=" + instrument +
                '}';
    }
}
