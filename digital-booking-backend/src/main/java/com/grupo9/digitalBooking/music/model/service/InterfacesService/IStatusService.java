package com.grupo9.digitalBooking.music.model.service.InterfacesService;


import com.grupo9.digitalBooking.music.model.DTO.StatusDTO;

import java.util.Set;

public interface IStatusService {
    StatusDTO createStatus(StatusDTO statusDTO);
    StatusDTO readStatus(Long id);
    StatusDTO modifyStatus(StatusDTO statusDTO);
    Boolean removeStatus(Long id);
    Set<StatusDTO> getAll();

}
