package com.grupo9.digitalBooking.music.model.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusDTO {

    private Long id;
    private String name;

    @Override
    public String toString() {
        return "StatusDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
