package com.grupo9.digitalBooking.music.model.service.InterfacesService;


import com.grupo9.digitalBooking.music.model.DTO.RolDTO;

import java.util.Set;

public interface IRolService {

    RolDTO createRol(RolDTO rolDTO);
    RolDTO readRol(Long id);
    RolDTO modifyRol(RolDTO rolDTO);
    Boolean removeRol(Long id);
    Set<RolDTO> getAll();
}
