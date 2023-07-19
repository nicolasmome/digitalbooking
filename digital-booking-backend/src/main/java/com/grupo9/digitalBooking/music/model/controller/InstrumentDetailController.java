package com.grupo9.digitalBooking.music.model.controller;

import com.grupo9.digitalBooking.music.model.DTO.InstrumentDetailDTO;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IInstrumentDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/instrumentDetails")

public class InstrumentDetailController {
    @Autowired
    IInstrumentDetailService instrumentDetailService;

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(InstrumentController.class));


    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping
    public ResponseEntity<?> createInstrumentDetail(@RequestBody InstrumentDetailDTO instrumentDetailDTO){
        instrumentDetailService.createInstrumentDetail(instrumentDetailDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/{id}")
    public InstrumentDetailDTO getInstrumentDetail(@PathVariable Long id){
        return instrumentDetailService.readInstrumentDetail(id);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PutMapping
    public ResponseEntity<?> modifyInstrumentDetail(@RequestBody InstrumentDetailDTO instrumentDetailDTO){
        instrumentDetailService.modifyInstrumentDetail(instrumentDetailDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeInstrumentDetail(@PathVariable Long id) {
        instrumentDetailService.removeInstrumentDetail(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping
    public Collection<InstrumentDetailDTO> getAllInstrumentDetails(){
        return instrumentDetailService.getAll();
    }



}
