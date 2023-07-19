package com.grupo9.digitalBooking.music.model.service.InterfacesService;

import com.grupo9.digitalBooking.music.model.DTO.InstrumentDTO;

import java.util.List;
import java.util.Set;

public interface IInstrumentService {

    InstrumentDTO createInstrument(InstrumentDTO instrumentDTO);
    InstrumentDTO readInstrument(Long id);
    InstrumentDTO modifyInstrument(InstrumentDTO instrumentDTO);
    Boolean removeInstrument(Long id);
    List<InstrumentDTO> getAll();
    List<InstrumentDTO> getInstrumentsByCategory(Long id);
}
