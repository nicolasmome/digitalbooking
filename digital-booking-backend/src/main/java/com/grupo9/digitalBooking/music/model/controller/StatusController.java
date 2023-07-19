package com.grupo9.digitalBooking.music.model.controller;


import com.grupo9.digitalBooking.music.model.DTO.StatusDTO;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IStatusService;
import com.grupo9.digitalBooking.music.model.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.logging.Logger;

@RestController
@RequestMapping("/status")
public class StatusController {

    @Autowired
    IStatusService statusService;

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(StatusController.class));


    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping
    public ResponseEntity<?> createStatus(@RequestBody StatusDTO statusDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The category already exists");
        StatusDTO isExist = statusService.createStatus(statusDTO);
        LOGGER.info("status creado: " + isExist);
        if(isExist != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isExist);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/{id}")
    public ResponseEntity<?> getStatus(@PathVariable Long id){

        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The status with " + id + " does not exist");
        StatusDTO isExist = statusService.readStatus(id);
        if(isExist != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isExist);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PutMapping
    public ResponseEntity<?> modifyStatus(@RequestBody StatusDTO statusDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The status "+ statusDTO.getId() +" does not exist");
        StatusDTO isModified = statusService.modifyStatus(statusDTO);
        if(isModified != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isModified);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeStatus(@PathVariable Long id) {
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The category " + id + " does not exist");
        Boolean wasDelete = statusService.removeStatus(id);
        if(wasDelete) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body("Message: Status was delete");
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping
    public ResponseEntity<?> getallStatus(){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: There are not information");
        Set<StatusDTO> status = statusService.getAll();

        if(status.size() > 0) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(status);
        }
        return response;
    }

}
