package com.grupo9.digitalBooking.music.model.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BrandDTO {

    private Long id;
    private String name;
    private String image;

    @Override
    public String toString() {
        return "BrandDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", icon='" + image + '\'' +
                '}';
    }
}
