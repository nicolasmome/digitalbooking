package com.grupo9.digitalBooking.music.model.repository;

import com.grupo9.digitalBooking.music.model.entities.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IBranch extends JpaRepository<Branch, Long> {

    Optional<Branch> findByName(String name);
    Optional<Branch> findByCity(String city);
}
