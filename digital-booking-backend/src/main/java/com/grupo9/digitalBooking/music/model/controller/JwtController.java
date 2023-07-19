package com.grupo9.digitalBooking.music.model.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo9.digitalBooking.music.model.DTO.UserDTO;
import com.grupo9.digitalBooking.music.model.DTO.UserResponseDTO;
import com.grupo9.digitalBooking.music.model.entities.AuthenticationRequest;
import com.grupo9.digitalBooking.music.model.entities.AuthenticationResponse;
import com.grupo9.digitalBooking.music.model.jwt.JwtUtil;
import com.grupo9.digitalBooking.music.model.service.UserServiceApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserServiceApi userService;

    @Autowired
    ObjectMapper mapper;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Message: The user not exist");
        Authentication login = null;
        try {
            login = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);
            UserResponseDTO user = mapper.convertValue(userService.userByEmail(userDetails.getUsername()), UserResponseDTO.class);

            AuthenticationResponse auth = new AuthenticationResponse(user, jwt);
            response = ResponseEntity.ok(auth);
        }catch (BadCredentialsException e) {
            response = ResponseEntity.status(HttpStatus.FORBIDDEN).body("Message: Error in email and password");
        }



        return response;
    }
}
