package com.grupo9.digitalBooking.music.model.repository;

import com.grupo9.digitalBooking.music.model.entities.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRol extends JpaRepository<Rol, Long> {

    //@Query("SELECT r FROM Rol r where r.name = ?1")
    Optional<Rol> findByName(String name);
}
