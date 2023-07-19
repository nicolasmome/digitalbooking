package com.grupo9.digitalBooking.music.model.DTO;

import com.grupo9.digitalBooking.music.model.entities.Rol;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {
    private Long id;
    private String name;
    private String lastName;
    private String dni;
    private String address;
    private String email;
    private Rol rol;
}
