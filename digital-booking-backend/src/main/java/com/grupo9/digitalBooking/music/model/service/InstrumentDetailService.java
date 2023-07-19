package com.grupo9.digitalBooking.music.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IInstrumentDetailService;
import com.grupo9.digitalBooking.music.model.DTO.InstrumentDetailDTO;
import com.grupo9.digitalBooking.music.model.entities.InstrumentDetail;
import com.grupo9.digitalBooking.music.model.repository.IInstrumentDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.logging.Logger;

@Service
public class InstrumentDetailService implements IInstrumentDetailService {

    @Autowired
    private IInstrumentDetail instrumentDetailRepository;

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(RolService.class));

    @Autowired
    ObjectMapper mapper;

    private InstrumentDetailDTO saveInstrumentDetail(InstrumentDetailDTO InstrumentDetailDTO){
        InstrumentDetail instrumentDetail =mapper.convertValue(InstrumentDetailDTO, InstrumentDetail.class);
        InstrumentDetailDTO result = mapper.convertValue(instrumentDetailRepository.save(instrumentDetail), InstrumentDetailDTO.class);
        return result;
    }

    private Boolean existById(Long id) {
        return instrumentDetailRepository.findById(id).isPresent();
    }

    @Override
    public void createInstrumentDetail(InstrumentDetailDTO instrumentDetailDTO) {
        saveInstrumentDetail(instrumentDetailDTO);
    }

    @Override
    public InstrumentDetailDTO readInstrumentDetail(Long id) {
        Optional<InstrumentDetail> instrumentDetail = instrumentDetailRepository.findById(id);
        InstrumentDetailDTO instrumentDetailDTO = null;
        if(instrumentDetail.isPresent())
            instrumentDetailDTO = mapper.convertValue(instrumentDetail, InstrumentDetailDTO.class);

        return instrumentDetailDTO;
    }


    @Override
    public InstrumentDetailDTO modifyInstrumentDetail(InstrumentDetailDTO instrumentDetailDTO) {

        InstrumentDetailDTO response = null;
        Boolean validateInstrumentDetail = existById(instrumentDetailDTO.getId());

        if(validateInstrumentDetail) {
            response = saveInstrumentDetail(instrumentDetailDTO);
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Boolean removeInstrumentDetail(Long id) {
        Boolean response = false;
        Boolean exist = existById(id);
        if(exist) {
            instrumentDetailRepository.deleteById(id);
            response = true;
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Set<InstrumentDetailDTO> getAll() {
        List<InstrumentDetail> instrumentDetail = instrumentDetailRepository.findAll();
        Set<InstrumentDetailDTO> instrumentDetailDTO = new HashSet<>();

        for (InstrumentDetail InstrumentDetails : instrumentDetail) {
            instrumentDetailDTO.add(mapper.convertValue(InstrumentDetails, InstrumentDetailDTO.class));
        }

        return instrumentDetailDTO;

    }
}
