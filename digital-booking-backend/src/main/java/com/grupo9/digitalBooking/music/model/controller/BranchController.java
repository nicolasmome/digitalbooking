package com.grupo9.digitalBooking.music.model.controller;


import com.grupo9.digitalBooking.music.model.DTO.BranchDTO;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IBranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/branches")
public class BranchController {

    @Autowired
    IBranchService branchService;
    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping
    public ResponseEntity<?> createBranch(@RequestBody BranchDTO branchDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The branch already exists");
        BranchDTO isExist = branchService.createBranch(branchDTO);
        if(isExist != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isExist);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/{id}")
    public ResponseEntity<?> getBranch(@PathVariable Long id){

        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The branch with " + id + " does not exist");
        BranchDTO isExist = branchService.readBranch(id);
        if(isExist != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isExist);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PutMapping
    public ResponseEntity<?> modifyBranch(@RequestBody BranchDTO branchDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The branch "+ branchDTO.getId() +" does not exist");
        BranchDTO isModified = branchService.modifyBranch(branchDTO);
        if(isModified != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isModified);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeBranch(@PathVariable Long id) {
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The branch " + id + " does not exist");
        Boolean wasDelete = branchService.removeBranch(id);
        if(wasDelete) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body("Message: Branch was delete");
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping
    public ResponseEntity<?> getAllBranches(){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: There are not information");
        Set<BranchDTO> branches = branchService.getAll();

        if(branches.size() > 0) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(branches);
        }
        return response;
    }

}
