package com.grupo9.digitalBooking.music.model.service.InterfacesService;

import com.grupo9.digitalBooking.music.model.DTO.InstrumentDTO;
import com.grupo9.digitalBooking.music.model.DTO.InstrumentDetailDTO;

import java.util.List;
import java.util.Set;

public interface IInstrumentDetailService {

    void createInstrumentDetail(InstrumentDetailDTO instrumentDetailDTO);
    InstrumentDetailDTO readInstrumentDetail(Long id);
    InstrumentDetailDTO modifyInstrumentDetail(InstrumentDetailDTO instrumentDetailDTO);
    Boolean removeInstrumentDetail(Long id);
    Set<InstrumentDetailDTO> getAll();
}
