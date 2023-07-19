package com.grupo9.digitalBooking.music.model.service.InterfacesService;

import com.grupo9.digitalBooking.music.model.DTO.BrandDTO;

import java.util.Set;

public interface IBrandService {
    BrandDTO createBrand(BrandDTO brandDTO);
    BrandDTO readBrand(Long id);
    BrandDTO modifyBrand(BrandDTO brandDTO);
    Boolean removeBrand(Long id);
    Set<BrandDTO> getAll();
}
