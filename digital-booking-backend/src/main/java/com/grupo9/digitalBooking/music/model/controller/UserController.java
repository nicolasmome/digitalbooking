
package com.grupo9.digitalBooking.music.model.controller;


import com.grupo9.digitalBooking.music.model.DTO.RolDTO;
import com.grupo9.digitalBooking.music.model.DTO.UserDTO;
import com.grupo9.digitalBooking.music.model.DTO.UserResponseDTO;
import com.grupo9.digitalBooking.music.model.repository.IUser;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IRolService;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IUserService;
import com.grupo9.digitalBooking.music.model.service.RolService;

import com.grupo9.digitalBooking.music.model.service.UserServiceApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserServiceApi userService;

    @Autowired
    IUser userRepostory;
    @Autowired
    RolService rolService;

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The user already exists");
        Boolean existRol = rolService.existById(userDTO.getRol().getId());
        UserResponseDTO createUser = null;
        if(existRol) {
            createUser = userService.createUser(userDTO);
        } else {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Message: The rol does not exist");
        }
        if(createUser != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(createUser);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The user with " + id + " does not exist");
        UserDTO isExist = userService.readUser(id);
        if(isExist != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isExist);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @PutMapping
    public ResponseEntity<?> modifyUser(@RequestBody UserDTO userDTO){
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The user "+ userDTO.getId() +" does not exist");
        Boolean existRol = rolService.existById(userDTO.getRol().getId());
        UserDTO isModified = null;

        if(existRol) {
            isModified = userService.modifyUser(userDTO);
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isModified);
        } else {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: The rol does not exist");
        }

        if(isModified != null) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(isModified);
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeUser(@PathVariable Long id) {
        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Message: The user " + id + " does not exist");
        Boolean wasDelete = userService.removeUser(id);
        if(wasDelete) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body("Message: User was delete");
        }
        return response;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5173")
    @GetMapping
    public ResponseEntity<?> getallUsers(){

        ResponseEntity<?> response = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Message: There are not information");
        Set<UserDTO> users = userService.getAll();

        if(users.size() > 0) {
            response = ResponseEntity.status(HttpStatus.OK)
                    .body(users);
        }
        return response;
    }
}
