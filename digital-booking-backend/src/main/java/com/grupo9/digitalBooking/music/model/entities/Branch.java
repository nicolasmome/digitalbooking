package com.grupo9.digitalBooking.music.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table (name="branch")

public class Branch {

    @Id
    @SequenceGenerator(name = "branch_sequence", sequenceName = "branch_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "branch_sequence")
    private Long id;
    private String city;
    private String direction;
    private String name;
    private Double latitude;
    private Double longitude;

}
