package com.grupo9.digitalBooking.music.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo9.digitalBooking.music.model.DTO.CategoryDTO;
import com.grupo9.digitalBooking.music.model.DTO.ImageDTO;
import com.grupo9.digitalBooking.music.model.DTO.InstrumentDTO;
import com.grupo9.digitalBooking.music.model.entities.Image;
import com.grupo9.digitalBooking.music.model.repository.IImage;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;

@Service
public class ImageService implements IImageService {

    @Autowired
    private IImage imageRepository;

    @Autowired
    private EntityManager entityManager;
    private static final Logger LOGGER = Logger.getLogger(String.valueOf(RolService.class));

    @Autowired
    ObjectMapper mapper;

    private ImageDTO saveImage(ImageDTO imageDTO){
        Image image =mapper.convertValue(imageDTO, Image.class);
        ImageDTO result = mapper.convertValue(imageRepository.save(image), ImageDTO.class);
        return result;
    }

    public Boolean existById(Long id) {
        return imageRepository.findById(id).isPresent();
    }

    @Override
    public ImageDTO createImage(ImageDTO imageDTO) {
        ImageDTO response = null;
        Boolean existImage = imageRepository.findByName(imageDTO.getName()).isPresent();
        if(!existImage) {

            response = saveImage(imageDTO);
        }

        return response;
    }

    @Override
    public ImageDTO readImage(Long id) {
        Optional<Image> image = imageRepository.findById(id);
        ImageDTO imageDTO = null;
        if(image.isPresent())
            imageDTO = mapper.convertValue(image, ImageDTO.class);
        return imageDTO;
    }

    @Override
    public ImageDTO modifyImage(ImageDTO imageDTO) {

        ImageDTO response = null;
        Boolean validateImage = existById(imageDTO.getId());

        if(validateImage) {
            response = saveImage(imageDTO);
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Boolean removeImage(Long id) {
        Boolean response = false;
        Boolean exist = existById(id);
        if(exist) {
            imageRepository.deleteById(id);
            response = true;
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Set<ImageDTO> getAll() {
        List<Image> images = imageRepository.findAll();
        Set<ImageDTO> imageDTO = new HashSet<>();

        for (Image image : images) {
            imageDTO.add(mapper.convertValue(image, ImageDTO.class));
        }

        return imageDTO;

    }
}
