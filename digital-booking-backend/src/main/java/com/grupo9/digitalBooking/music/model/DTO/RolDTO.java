package com.grupo9.digitalBooking.music.model.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RolDTO {

    private Long id;
    private String name;

    @Override
    public String toString() {
        return "RolDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
