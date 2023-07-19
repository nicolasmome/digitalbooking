package com.grupo9.digitalBooking.music.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo9.digitalBooking.music.model.DTO.BranchDTO;
import com.grupo9.digitalBooking.music.model.entities.Branch;
import com.grupo9.digitalBooking.music.model.repository.IBranch;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IBranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;

@Service
public class BranchService implements IBranchService {

    @Autowired
    private IBranch branchRepository;

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(BranchService.class));

    @Autowired
    ObjectMapper mapper;

    private BranchDTO saveBranch(BranchDTO branchDTO){
        Branch branch =mapper.convertValue(branchDTO, Branch.class);
       BranchDTO result = mapper.convertValue(branchRepository.save(branch), BranchDTO.class);
        return result;
    }

    public Boolean existById(Long id) {
        return branchRepository.findById(id).isPresent();
    }

    @Override
    public BranchDTO createBranch(BranchDTO branchDTO) {
        BranchDTO response = null;
        Boolean existBranch = branchRepository.findByName(branchDTO.getName()).isPresent();
        if(!existBranch) {
            response = saveBranch(branchDTO);
        }
        LOGGER.info("respuesta: " + response);
        return response;
    }

    @Override
    public BranchDTO readBranch(Long id) {
        Optional<Branch> branch = branchRepository.findById(id);
        BranchDTO branchDTO = null;
        if(branch.isPresent())
            branchDTO = mapper.convertValue(branch, BranchDTO.class);

        return branchDTO;
    }


    @Override
    public BranchDTO modifyBranch(BranchDTO branchDTO) {

        BranchDTO response = null;
        Boolean validateBranch = existById(branchDTO.getId());

        if(validateBranch) {
            response = saveBranch(branchDTO);
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Boolean removeBranch(Long id) {
        Boolean response = false;
        Boolean exist = existById(id);
        if(exist) {
            branchRepository.deleteById(id);
            response = true;
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Set<BranchDTO> getAll() {
        List<Branch> branches = branchRepository.findAll();
        Set<BranchDTO> branchDTO = new HashSet<>();

        for (Branch branch : branches) {
            branchDTO.add(mapper.convertValue(branch, BranchDTO.class));
        }

        return branchDTO;

    }
}
