package com.grupo9.digitalBooking.music.model.service;

import com.grupo9.digitalBooking.music.model.entities.UserApp;
import com.grupo9.digitalBooking.music.model.repository.IUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.logging.Logger;


@Service
@Slf4j
public class UserDetailServiceImpl implements UserDetailsService {

    private final IUser userRepository;
    private static final Logger LOGGER = Logger.getLogger(String.valueOf(UserDetailServiceImpl.class));


    @Autowired
    public UserDetailServiceImpl(IUser userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserApp user = userRepository.findByEmail(email).orElse(null);
        LOGGER.info("User: " + user);
        if (user == null) {
            log.error("user no found with email  "+email);
            throw new UsernameNotFoundException("Error no found user with email " + email);
        }

        return new org.springframework.security.core.userdetails.User
                (user.getEmail(), user.getPassword(),
                        Collections.singleton(
                                new SimpleGrantedAuthority(
                                        (user.getRol().getName())
                                )
                        )
                );

    }


}
