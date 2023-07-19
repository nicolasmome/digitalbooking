package com.grupo9.digitalBooking.music.model.DTO;

import com.grupo9.digitalBooking.music.model.entities.Instrument;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageDTO {


    private Long id;
    private String name;
    private String url;
    private InstrumentDTO instrument;

    @Override
    public String toString() {
        return "ImageDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", instrument=" + instrument +
                '}';
    }
}
