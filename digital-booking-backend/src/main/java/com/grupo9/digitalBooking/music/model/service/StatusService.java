package com.grupo9.digitalBooking.music.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo9.digitalBooking.music.model.DTO.StatusDTO;
import com.grupo9.digitalBooking.music.model.entities.Status;
import com.grupo9.digitalBooking.music.model.repository.IStatus;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;

@Service
public class StatusService implements IStatusService {

    @Autowired
    private IStatus statusRepository;

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(StatusService.class));

    @Autowired
    ObjectMapper mapper;

    private StatusDTO saveStatus(StatusDTO statusDTO){
        Status status =mapper.convertValue(statusDTO, Status.class);
        StatusDTO result = mapper.convertValue(statusRepository.save(status), StatusDTO.class);
        return result;
    }

    public Boolean existById(Long id) {
        return statusRepository.findById(id).isPresent();
    }

    @Override
    public StatusDTO createStatus(StatusDTO statusDTO) {
        StatusDTO response = null;
        Boolean existRol = statusRepository.findByName(statusDTO.getName()).isPresent();
        if(!existRol) {
            response = saveStatus(statusDTO);
        }
        LOGGER.info("respuesta: " + response);
        return response;
    }

    @Override
    public StatusDTO readStatus(Long id) {
        Optional<Status> status = statusRepository.findById(id);
        StatusDTO statusDTO = null;
        if(status.isPresent())
            statusDTO = mapper.convertValue(status, StatusDTO.class);

        return statusDTO;
    }


    @Override
    public StatusDTO modifyStatus(StatusDTO statusDTO) {

        StatusDTO response = null;
        Boolean validateStatus = existById(statusDTO.getId());

        if(validateStatus) {
            response = saveStatus(statusDTO);
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Boolean removeStatus(Long id) {
        Boolean response = false;
        Boolean exist = existById(id);
        if(exist) {
            statusRepository.deleteById(id);
            response = true;
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Set<StatusDTO> getAll() {
        List<Status> status = statusRepository.findAll();
        Set<StatusDTO> statusDTO = new HashSet<>();

        for (Status status1 : status) {
            statusDTO.add(mapper.convertValue(status1, StatusDTO.class));
        }

        return statusDTO;

    }
}
