package com.grupo9.digitalBooking.music.model.service;


 import com.fasterxml.jackson.databind.ObjectMapper;
 import com.grupo9.digitalBooking.music.model.DTO.UserResponseDTO;
 import com.grupo9.digitalBooking.music.model.entities.UserApp;
 import com.grupo9.digitalBooking.music.model.repository.IUser;
 import com.grupo9.digitalBooking.music.model.service.InterfacesService.IUserService;
 import com.grupo9.digitalBooking.music.model.DTO.UserDTO;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.security.crypto.password.PasswordEncoder;
 import org.springframework.stereotype.Service;

 import java.util.HashSet;
 import java.util.List;
 import java.util.Optional;
 import java.util.Set;
 import java.util.logging.Logger;


 @Service
public class UserServiceApi implements IUserService{

     @Autowired
     private IUser userRepository;

     @Autowired
      private  final PasswordEncoder passwordEncoder;

     private static final Logger LOGGER = Logger.getLogger(String.valueOf(UserServiceApi.class));

     @Autowired
     ObjectMapper mapper;

      public UserServiceApi(IUser userRepository, PasswordEncoder passwordEncoder) {
           this.userRepository = userRepository;
           this.passwordEncoder = passwordEncoder;
      }

      private UserDTO saveUser(UserDTO userDTO){
          UserApp userApp = mapper.convertValue(userDTO, UserApp.class);
          UserDTO result = mapper.convertValue(userRepository.save(userApp), UserDTO.class);

     return result;
     }

     private Boolean existById(Long id) {
     return userRepository.findById(id).isPresent();
     }

     public Boolean existByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public UserDTO userByEmail(String email) {
        UserDTO response = null;
        if(existByEmail(email)) {
            response = mapper.convertValue(userRepository.findByEmail(email), UserDTO.class);
        }

        return response;
    }

     @Override
     public UserResponseDTO createUser(UserDTO userDTO) {
          UserDTO response = null;
          Boolean existUser = userRepository.findByEmail(userDTO.getEmail()).isPresent();
          Boolean existDNI = userRepository.findByDni(userDTO.getDni()).isPresent();
          if(!existUser && !existDNI) {
              String passwordEncrypt=passwordEncoder.encode(userDTO.getPassword());
              userDTO.setPassword(passwordEncrypt);
              response = saveUser(userDTO);


          }

          UserResponseDTO userResponse = mapper.convertValue(response, UserResponseDTO.class);
          LOGGER.info("respuesta: " + response);
          return userResponse;
     }

     @Override
     public UserDTO readUser(Long id) {
          Optional<UserApp> user = userRepository.findById(id);
          UserDTO userDTO = null;
          if(user.isPresent()) {
              userDTO = mapper.convertValue(user, UserDTO.class);
          }
         userDTO.setPassword(null);

          return userDTO;
     }

     @Override
     public UserDTO modifyUser(UserDTO userDTO) {
          LOGGER.info("Update Rol..." + " - " + userDTO.getId());
          UserDTO response = null;
          Boolean validateUser = existById(userDTO.getId());

          if(validateUser) {
              UserApp userDB = userRepository.findUserById(userDTO.getId());
              Boolean isEqual = passwordEncoder.matches(userDTO.getPassword(), userDB.getPassword());

              if(!isEqual) {
                  String newPassword = passwordEncoder.encode(userDTO.getPassword());
                  userDTO.setPassword(newPassword);
              } else {
                  userDTO.setPassword(userDB.getPassword());
              }
              userDTO.setPassword(null);
              response = saveUser(userDTO);
              LOGGER.info("passwords Equals: " + isEqual);
          }

          LOGGER.info("response: " + response);
          return response;
     }

     @Override
     public Boolean removeUser(Long id) {
          Boolean response = false;
          Boolean exist = existById(id);
          if(exist) {
              userRepository.deleteById(id);
              response = true;
          }
          LOGGER.info("response: " + response);
          return response;
     }

     @Override
     public Set<UserDTO> getAll() {
          List<UserApp> userApps = userRepository.findAll();
          Set<UserDTO> userDTOS = new HashSet<>();

          for (UserApp userApp : userApps) {
              userApp.setPassword(null);
              userDTOS.add(mapper.convertValue(userApp, UserDTO.class));
          }

          return userDTOS;

     }



     
}
