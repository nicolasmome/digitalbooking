package com.grupo9.digitalBooking.music.model.service.InterfacesService;

import com.grupo9.digitalBooking.music.model.DTO.BranchDTO;

import java.util.Set;

public interface IBranchService {

    BranchDTO createBranch(BranchDTO branchDTO);
    BranchDTO readBranch(Long id);
    BranchDTO modifyBranch(BranchDTO branchDTO);
    Boolean removeBranch(Long id);
    Set<BranchDTO> getAll();

}
