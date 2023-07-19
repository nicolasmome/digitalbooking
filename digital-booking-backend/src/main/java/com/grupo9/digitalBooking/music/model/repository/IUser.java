package com.grupo9.digitalBooking.music.model.repository;

import com.grupo9.digitalBooking.music.model.entities.UserApp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface IUser extends JpaRepository<UserApp, Long> {
    Optional<UserApp> findByEmail(String email);
    Optional<UserApp> findByDni(String dni);
    UserApp findUserById(Long id);
}
