package com.grupo9.digitalBooking.music.model.entities;

import com.grupo9.digitalBooking.music.model.DTO.UserResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AuthenticationResponse {


    private UserResponseDTO user;
    private final String token;

    public AuthenticationResponse(String jwt) {
        this.token = jwt;
    }


}
