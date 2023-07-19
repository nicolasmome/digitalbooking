package com.grupo9.digitalBooking.music.model.config;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.grupo9.digitalBooking.music.model.entities.Rol;
import com.grupo9.digitalBooking.music.model.entities.UserApp;
import com.grupo9.digitalBooking.music.model.repository.IRol;
import com.grupo9.digitalBooking.music.model.repository.IUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import sendinblue.Json;

@Component
public class DataLoader implements ApplicationRunner {

    private IUser userRepository;

    private IRol rolRepository;

    @Autowired
    public DataLoader(IUser userRepository, IRol rolRepository) {
        this.userRepository = userRepository;
        this.rolRepository = rolRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String password = passwordEncoder.encode("password");
        Rol rolAdmin = rolRepository.save(new Rol("ADMIN"));
        Rol rolUser = rolRepository.save(new Rol("USER"));

        userRepository.save(new UserApp("Charly",
                "charly", "charly", "address",
                "1234asd", "charly@pruebas.com"
                ,password,  rolAdmin));
    }


}
