package com.grupo9.digitalBooking.music.model.controller;


import com.grupo9.digitalBooking.music.model.DTO.BrandDTO;
import com.grupo9.digitalBooking.music.model.DTO.RolDTO;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Set;

@RestController
@RequestMapping("/brands")
public class BrandController {

    @Autowired
    IBrandService brandService;

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping
    public ResponseEntity<?> createBrand(@RequestBody BrandDTO brandDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The Brand already exists");
        BrandDTO isExist = brandService.createBrand(brandDTO);
        if(isExist != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isExist);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/{id}")
    public ResponseEntity<?>  getBrand(@PathVariable Long id){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The Brand with " + id + " does not exist");
        BrandDTO isExist = brandService.readBrand(id);
        if(isExist != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isExist);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PutMapping
    public ResponseEntity<?> modifyBrand(@RequestBody BrandDTO brandDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The Brand with " + brandDTO.getId() + " does not exist");
        BrandDTO isExist = brandService.modifyBrand(brandDTO);
        if(isExist != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isExist);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeBrand(@PathVariable Long id) {
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The Brand with " + id + " does not exist");
        Boolean wasDelete = brandService.removeBrand(id);
        if(wasDelete) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body("Message: Brand was delete");
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping
    public ResponseEntity<?> getallBrands(){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: There are not information");
        Set<BrandDTO> brands = brandService.getAll();
        if(brands.size() > 0 ) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(brands);
        }
        return response;
    }
}
