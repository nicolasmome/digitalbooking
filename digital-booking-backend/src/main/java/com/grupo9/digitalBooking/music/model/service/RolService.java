package com.grupo9.digitalBooking.music.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IRolService;
import com.grupo9.digitalBooking.music.model.DTO.RolDTO;
import com.grupo9.digitalBooking.music.model.entities.Rol;
import com.grupo9.digitalBooking.music.model.repository.IRol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.logging.Logger;

@Service
public class RolService implements IRolService {

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(RolService.class));


    @Autowired
    private IRol rolRepository;

    @Autowired
    ObjectMapper mapper;

    /**
     * Realiza la acción de guardar y actualizar
     *
     * */
    private RolDTO saveRol(RolDTO rolDTO){
        Rol rol = mapper.convertValue(rolDTO, Rol.class);
        RolDTO result = mapper.convertValue(rolRepository.save(rol), RolDTO.class);
        return result;
    }
    public Boolean existById(Long id) {
        return rolRepository.findById(id).isPresent();
    }

    @Override
    public RolDTO createRol(RolDTO rolDTO) {
        RolDTO response = null;
        Boolean existRol = rolRepository.findByName(rolDTO.getName()).isPresent();
        if(!existRol) {
            response = saveRol(rolDTO);
        }
        LOGGER.info("respuesta: " + response);
        return response;
    }


    public Set<RolDTO> getAll() {
        List<Rol> rols = rolRepository.findAll();
        Set<RolDTO> rolDTOS = new HashSet<>();

        for (Rol rol1 : rols) {
            rolDTOS.add(mapper.convertValue(rol1, RolDTO.class));
        }
        return rolDTOS;
    }


    @Override
    public RolDTO readRol(Long id) {
        Optional<Rol> rol = rolRepository.findById(id);
        RolDTO rolDTO = null;
        if(rol.isPresent())
            rolDTO = mapper.convertValue(rol, RolDTO.class);

        return rolDTO;
    }

    @Override
    public RolDTO modifyRol(RolDTO rolDTO) {

        LOGGER.info("Update Rol..." + " - " + rolDTO.getId());
        RolDTO response = null;
        Boolean validateRol = existById(rolDTO.getId());

        if(validateRol) {
            response = saveRol(rolDTO);
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Boolean removeRol(Long id) {

        Boolean response = false;
        Boolean exist = existById(id);
        if(exist) {
            rolRepository.deleteById(id);
            response = true;
        }
        LOGGER.info("response: " + response);
        return response;
    }

}
