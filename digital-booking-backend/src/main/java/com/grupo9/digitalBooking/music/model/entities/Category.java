package com.grupo9.digitalBooking.music.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import javax.persistence.*;

@Getter
@Setter
@Entity
@Table (name="category")
public class Category {

    @Id
    @SequenceGenerator(name = "category_sequence", sequenceName = "category_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "category_sequence")
    private Long id;
    private String name;
    private String description;
    private String image;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private Set<Instrument> instrument;

}
