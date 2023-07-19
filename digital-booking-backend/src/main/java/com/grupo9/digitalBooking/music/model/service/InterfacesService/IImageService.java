package com.grupo9.digitalBooking.music.model.service.InterfacesService;


import com.grupo9.digitalBooking.music.model.DTO.ImageDTO;

import java.util.Set;

public interface IImageService {
    ImageDTO createImage(ImageDTO imageDTO);
    ImageDTO readImage(Long id);
    ImageDTO modifyImage(ImageDTO imageDTO);
    Boolean removeImage(Long id);
    Set<ImageDTO> getAll();
}
