package com.grupo9.digitalBooking.music.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo9.digitalBooking.music.model.repository.IBrand;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IBrandService;
import com.grupo9.digitalBooking.music.model.DTO.BrandDTO;
import com.grupo9.digitalBooking.music.model.entities.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;

@Service
public class BrandService implements IBrandService {

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(BrandService.class));

    @Autowired
    private IBrand brandRepository;

    @Autowired
    ObjectMapper mapper;


    private BrandDTO saveBrand(BrandDTO brandDTO){
        Brand brand = mapper.convertValue(brandDTO, Brand.class);
        BrandDTO result = mapper.convertValue(brandRepository.save(brand), BrandDTO.class);
        return result;
    }

    public Boolean existById(Long id) {
        return brandRepository.findById(id).isPresent();
    }

    @Override
    public BrandDTO createBrand(BrandDTO brandDTO) {
        BrandDTO response = null;
        Boolean existBrand = brandRepository.findByName(brandDTO.getName()).isPresent();
        if(!existBrand) {
            response = saveBrand(brandDTO);
        }
        LOGGER.info("respuesta: " + response);
        return response;
    }

    @Override
    public BrandDTO readBrand(Long id) {
        Optional<Brand> brand = brandRepository.findById(id);
        BrandDTO brandDTO = null;
        if(brand.isPresent())
            brandDTO = mapper.convertValue(brand, BrandDTO.class);

        return brandDTO;
    }

    @Override
    public BrandDTO modifyBrand(BrandDTO brandDTO) {
        BrandDTO response = null;
        Boolean existBrand = existById(brandDTO.getId());
        if(existBrand) {
            response = saveBrand(brandDTO);
        }
        return response;
    }

    @Override
    public Boolean removeBrand(Long id) {
        Boolean response = false;
        Boolean existBrand = existById(id);

        if(existBrand) {
            brandRepository.deleteById(id);
            response = true;
        }
        return response;
    }

    @Override
    public Set<BrandDTO> getAll() {
        List<Brand> brands = brandRepository.findAll();
        Set<BrandDTO> brandDTO = new HashSet<>();

        brands.forEach(brand -> brandDTO.add(mapper.convertValue(brand, BrandDTO.class)));
        return brandDTO;
    }
}
