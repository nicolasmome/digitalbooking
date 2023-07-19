package com.grupo9.digitalBooking.music.model.repository;

import com.grupo9.digitalBooking.music.model.entities.Brand;
import com.grupo9.digitalBooking.music.model.entities.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IBrand extends JpaRepository<Brand, Long> {
    @Query("SELECT b FROM Brand b where b.name = ?1")
    Optional<Brand> findByName(String name);
}
