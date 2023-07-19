package com.grupo9.digitalBooking.music.controllerTest;

import com.grupo9.digitalBooking.music.model.DTO.UserDTO;
import com.grupo9.digitalBooking.music.model.DTO.UserResponseDTO;
import com.grupo9.digitalBooking.music.model.controller.UserController;
import com.grupo9.digitalBooking.music.model.entities.Rol;
import com.grupo9.digitalBooking.music.model.service.UserServiceApi;
import com.grupo9.digitalBooking.music.model.service.RolService;
import com.grupo9.digitalBooking.music.model.repository.IUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.mockito.InjectMocks;


import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class UserControllerTest {
    @InjectMocks
    private UserController userController;

    @Mock
    private UserServiceApi userService;

    @Mock
    private IUser userRepository;

    @Mock
    private RolService rolService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    public void createUser_RolDoesNotExist_ReturnsBadRequest() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        userDTO.setName("John");
        userDTO.setLastName("Doe");
        userDTO.setDni("123456789");
        userDTO.setPassword("password");
        userDTO.setAddress("123 Main St");
        userDTO.setEmail("john.doe@example.com");
        Rol rolDTO = new Rol();
        rolDTO.setId(1L);
        rolDTO.setName("RoleName");
        userDTO.setRol(rolDTO);

        when(rolService.existById(rolDTO.getId())).thenReturn(false);

        // Act
        ResponseEntity<?> response = userController.createUser(userDTO);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

        String message = (String) response.getBody();
        assertEquals("Message: The rol does not exist", message);

    }

    @Test
    public void getUser_ExistingUserId_ReturnsOK() {
        // Arrange
        Long userId = 1L;

        UserDTO userDTO = new UserDTO();
        userDTO.setId(userId);
        userDTO.setName("John");
        userDTO.setLastName("Doe");
        userDTO.setDni("123456789");
        userDTO.setPassword("password");
        userDTO.setAddress("123 Main St");
        userDTO.setEmail("john.doe@example.com");
        Rol rolDTO = new Rol();
        rolDTO.setId(1L);
        rolDTO.setName("RoleName");
        userDTO.setRol(rolDTO);

        when(userService.readUser(userId)).thenReturn(userDTO);

        // Act
        ResponseEntity<?> response = userController.getUser(userId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        UserDTO retrievedUser = (UserDTO) response.getBody();
        assertEquals(userDTO.getName(), retrievedUser.getName());
        assertEquals(userDTO.getLastName(), retrievedUser.getLastName());

    }

    @Test
    public void getUser_NonExistingUserId_ReturnsBadRequest() {
        // Arrange
        Long userId = 1L;

        when(userService.readUser(userId)).thenReturn(null);

        // Act
        ResponseEntity<?> response = userController.getUser(userId);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

        String message = (String) response.getBody();
        assertEquals("Message: The user with " + userId + " does not exist", message);

    }

    @Test
    public void modifyUser_ValidUserDTO_ReturnsOK() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        userDTO.setName("John");
        userDTO.setLastName("Doe");
        userDTO.setDni("123456789");
        userDTO.setPassword("password");
        userDTO.setAddress("123 Main St");
        userDTO.setEmail("john.doe@example.com");
        Rol rolDTO = new Rol();
        rolDTO.setId(1L);
        rolDTO.setName("RoleName");
        userDTO.setRol(rolDTO);

        when(rolService.existById(rolDTO.getId())).thenReturn(true);
        when(userService.modifyUser(userDTO)).thenReturn(userDTO);

        // Act
        ResponseEntity<?> response = userController.modifyUser(userDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        UserDTO modifiedUser = (UserDTO) response.getBody();
        assertEquals(userDTO.getName(), modifiedUser.getName());
        assertEquals(userDTO.getLastName(), modifiedUser.getLastName());

    }

    @Test
    public void modifyUser_RolDoesNotExist_ReturnsBadRequest() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        userDTO.setName("John");
        userDTO.setLastName("Doe");
        userDTO.setDni("123456789");
        userDTO.setPassword("password");
        userDTO.setAddress("123 Main St");
        userDTO.setEmail("john.doe@example.com");
        Rol rolDTO = new Rol();
        rolDTO.setId(1L);
        rolDTO.setName("RoleName");
        userDTO.setRol(rolDTO);

        when(rolService.existById(rolDTO.getId())).thenReturn(false);

        // Act
        ResponseEntity<?> response = userController.modifyUser(userDTO);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

        String message = (String) response.getBody();
        assertEquals("Message: The rol does not exist", message);

    }

    @Test
    public void removeUser_ExistingUserId_ReturnsOK() {
        // Arrange
        Long userId = 1L;

        when(userService.removeUser(userId)).thenReturn(true);

        // Act
        ResponseEntity<?> response = userController.removeUser(userId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        String message = (String) response.getBody();
        assertEquals("Message: User was delete", message);

    }

    @Test
    public void removeUser_NonExistingUserId_ReturnsBadRequest() {
        // Arrange
        Long userId = 1L;

        when(userService.removeUser(userId)).thenReturn(false);

        // Act
        ResponseEntity<?> response = userController.removeUser(userId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());

        String message = (String) response.getBody();
        assertEquals("Message: The user " + userId + " does not exist", message);

    }

    @Test
    public void getallUsers_UsersExist_ReturnsOK() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        userDTO.setName("John");
        userDTO.setLastName("Doe");
        userDTO.setDni("123456789");
        userDTO.setPassword("password");
        userDTO.setAddress("123 Main St");
        userDTO.setEmail("john.doe@example.com");
        Rol rolDTO = new Rol();
        rolDTO.setId(1L);
        rolDTO.setName("RoleName");
        userDTO.setRol(rolDTO);

        Set<UserDTO> users = new HashSet<>(Collections.singletonList(userDTO));

        when(userService.getAll()).thenReturn(users);

        // Act
        ResponseEntity<?> response = userController.getallUsers();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        Set<UserDTO> retrievedUsers = (Set<UserDTO>) response.getBody();
        assertEquals(1, retrievedUsers.size());
        UserDTO retrievedUser = retrievedUsers.iterator().next();
        assertEquals(userDTO.getName(), retrievedUser.getName());
        assertEquals(userDTO.getLastName(), retrievedUser.getLastName());

    }

    @Test
    public void getallUsers_NoUsersExist_ReturnsBadRequest() {
        // Arrange
        when(userService.getAll()).thenReturn(Collections.emptySet());

        // Act
        ResponseEntity<?> response = userController.getallUsers();

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

        String message = (String) response.getBody();
        assertEquals("Message: There are not information", message);

    }
}


