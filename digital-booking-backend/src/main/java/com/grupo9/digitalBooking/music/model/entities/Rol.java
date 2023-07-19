package com.grupo9.digitalBooking.music.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table (name="Rol")
public class Rol {

    @Id
    @SequenceGenerator(name = "rol_sequence", sequenceName = "rol_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "rol_sequence")
    private Long id;
    private String name;

    //@OneToMany(mappedBy = "rol")
    //@JsonIgnore
    //private Set<UserApp> userApp;


    public Rol(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Rol{" +
                "id=" + id +
                ", name='" + name + '\'' +
                //", user=" + userApp +
                '}';
    }
}
