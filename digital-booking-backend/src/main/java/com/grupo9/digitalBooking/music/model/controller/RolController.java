package com.grupo9.digitalBooking.music.model.controller;


import com.grupo9.digitalBooking.music.model.DTO.RolDTO;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IRolService;
import com.grupo9.digitalBooking.music.model.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Set;
import java.util.logging.Logger;

@RestController
@RequestMapping("/rols")
public class RolController {


    @Autowired
    IRolService rolService;
    private static final Logger LOGGER = Logger.getLogger(String.valueOf(RolService.class));


    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/{id}")
    public ResponseEntity<?> getRol (@PathVariable Long id){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The role with " + id + " does not exist");
        RolDTO isExist = rolService.readRol(id);
        if(isExist != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isExist);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping
    public ResponseEntity<?> getAllRols(){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: There are not information");
        Set<RolDTO> rols = rolService.getAll();

        if(rols.size() > 0) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(rols);
        }
        return response;
    }


    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping
    public ResponseEntity<?> createRol(@RequestBody RolDTO rolDTO){

        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The role already exists");
        RolDTO isExist = rolService.createRol(rolDTO);

        if(isExist != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isExist);
        }
        return response;
    }


    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PutMapping
    public ResponseEntity<?> updateRol(@RequestBody RolDTO rolDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The role "+ rolDTO.getId() +" does not exist");
        RolDTO isModified = rolService.modifyRol(rolDTO);
        if(isModified != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isModified);
        }
        return response;
    }


    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeRol(@PathVariable Long id) {
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The role " + id + " does not exist");
        Boolean wasDelete = rolService.removeRol(id);
        if(wasDelete) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body("Message: Role was delete");
        }
        return response;
    }

}
