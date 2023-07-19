package com.grupo9.digitalBooking.music.model.controller;

import com.grupo9.digitalBooking.music.model.DTO.InstrumentDTO;
import com.grupo9.digitalBooking.music.model.service.*;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IInstrumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/instruments")
public class InstrumentController {

    @Autowired
    InstrumentService instrumentService;
    @Autowired
    CategoryService categoryService;
    @Autowired
    BrandService brandService;
    @Autowired
    StatusService statusService;
    @Autowired
    ImageService imageService;
    private static final Logger LOGGER = Logger.getLogger(String.valueOf(InstrumentController.class));

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping
    public ResponseEntity<?> createInstrument(@RequestBody InstrumentDTO instrumentDTO){

        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The instrument already exists");

        InstrumentDTO newInstrument = instrumentService.createInstrument(instrumentDTO);
        if (newInstrument != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(newInstrument);
        }

        if(instrumentDTO == null) {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Message: Error, request data is empty");
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/{id}")
    public ResponseEntity<?> getInstrument(@PathVariable Long id){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The instrument with " + id + " does not exist");

        InstrumentDTO instrument = instrumentService.readInstrument(id);

        if(instrument != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(instrument);
        }

        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PutMapping
    public ResponseEntity<?> modifyInstrument(@RequestBody InstrumentDTO instrumentDTO){
        Boolean category = categoryService.existById(instrumentDTO.getCategory().getId());
        Boolean brand = brandService.existById(instrumentDTO.getBrand().getId());
        Boolean status = statusService.existById(instrumentDTO.getStatus().getId());

        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The category "+ instrumentDTO.getId() +" does not exist");

        InstrumentDTO newInstrument = null;

        if(category && brand && status) {
            newInstrument = instrumentService.modifyInstrument(instrumentDTO);
        } else {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Message: Request Error");
        }

        if (newInstrument != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(newInstrument);
        }

        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeInstrument(@PathVariable Long id) {
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The category " + id + " does not exist");

        instrumentService.removeInstrument(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping
    public ResponseEntity<?> getAllInstruments(){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: There are not information");

        List<InstrumentDTO> instruments = instrumentService.getAll();
        if(instruments.size() > 0) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(instruments);
        }

        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/category/{categoryId}")
    public List<InstrumentDTO> getInstrumentsByCategory(@PathVariable Long categoryId) {
        LOGGER.info("categoryId: " + categoryId);
        return instrumentService.getInstrumentsByCategory(categoryId);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/city/{city}")
    public ResponseEntity<?> getInstrumentByCity(@PathVariable String city) {
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: There are not information");

        List<InstrumentDTO> instrumentDTOS = instrumentService.getInstrumentByCity(city);
        if(instrumentDTOS.size() > 0) {
            response = ResponseEntity.status(HttpStatus.OK).body(instrumentDTOS);
        }
        return response;
    }
}
