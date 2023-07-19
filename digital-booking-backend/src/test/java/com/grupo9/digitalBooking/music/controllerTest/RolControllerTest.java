package com.grupo9.digitalBooking.music.controllerTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.*;

import java.util.HashSet;
import java.util.Set;

import com.grupo9.digitalBooking.music.model.controller.RolController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.grupo9.digitalBooking.music.model.DTO.RolDTO;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IRolService;

class RolControllerTest {

    @Mock
    private IRolService rolService;

    @InjectMocks
    private RolController rolController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetRol_ExistingId_ReturnsRolDTO() {
        Long id = 1L;
        RolDTO rolDTO = new RolDTO();
        rolDTO.setId(id);
        rolDTO.setName("Admin");

        when(rolService.readRol(id)).thenReturn(rolDTO);

        ResponseEntity<?> response = rolController.getRol(id);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(rolDTO, response.getBody());

        verify(rolService).readRol(id);
        verifyNoMoreInteractions(rolService);
    }

    @Test
    void testGetRol_NonExistingId_ReturnsNotFound() {
        Long id = 1L;

        when(rolService.readRol(id)).thenReturn(null);

        ResponseEntity<?> response = rolController.getRol(id);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The role with " + id + " does not exist", response.getBody());

        verify(rolService).readRol(id);
        verifyNoMoreInteractions(rolService);
    }

    @Test
    void testGetAllRols_ExistingRols_ReturnsRolsSet() {
        Set<RolDTO> rols = new HashSet<>();
        RolDTO rol1 = new RolDTO();
        rol1.setId(1L);
        rol1.setName("Admin");
        RolDTO rol2 = new RolDTO();
        rol2.setId(2L);
        rol2.setName("User");
        rols.add(rol1);
        rols.add(rol2);

        when(rolService.getAll()).thenReturn(rols);

        ResponseEntity<?> response = rolController.getAllRols();

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(rols, response.getBody());

        verify(rolService).getAll();
        verifyNoMoreInteractions(rolService);
    }

    @Test
    void testGetAllRols_EmptyRols_ReturnsNotFound() {
        Set<RolDTO> rols = new HashSet<>();

        when(rolService.getAll()).thenReturn(rols);

        ResponseEntity<?> response = rolController.getAllRols();

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: There are not information", response.getBody());

        verify(rolService).getAll();
        verifyNoMoreInteractions(rolService);
    }

    @Test
    void testCreateRol_NewRol_ReturnsCreatedRol() {
        RolDTO rolDTO = new RolDTO();
        rolDTO.setId(1L);
        rolDTO.setName("Admin");

        when(rolService.createRol(rolDTO)).thenReturn(rolDTO);

        ResponseEntity<?> response = rolController.createRol(rolDTO);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(rolDTO, response.getBody());

        verify(rolService).createRol(rolDTO);
        verifyNoMoreInteractions(rolService);
    }

    @Test
    void testCreateRol_ExistingRol_ReturnsBadRequest() {
        RolDTO rolDTO = new RolDTO();
        rolDTO.setId(1L);
        rolDTO.setName("Admin");

        when(rolService.createRol(rolDTO)).thenReturn(null);

        ResponseEntity<?> response = rolController.createRol(rolDTO);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The role already exists", response.getBody());

        verify(rolService).createRol(rolDTO);
        verifyNoMoreInteractions(rolService);
    }

    @Test
    void testUpdateRol_ExistingRol_ReturnsUpdatedRol() {
        RolDTO rolDTO = new RolDTO();
        rolDTO.setId(1L);
        rolDTO.setName("Admin");

        when(rolService.modifyRol(rolDTO)).thenReturn(rolDTO);

        ResponseEntity<?> response = rolController.updateRol(rolDTO);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(rolDTO, response.getBody());

        verify(rolService).modifyRol(rolDTO);
        verifyNoMoreInteractions(rolService);
    }

    @Test
    void testUpdateRol_NonExistingRol_ReturnsNotFound() {
        RolDTO rolDTO = new RolDTO();
        rolDTO.setId(1L);
        rolDTO.setName("Admin");

        when(rolService.modifyRol(rolDTO)).thenReturn(null);

        ResponseEntity<?> response = rolController.updateRol(rolDTO);

        assertSame(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Message: The role " + rolDTO.getId() + " does not exist", response.getBody());

        verify(rolService).modifyRol(rolDTO);
        verifyNoMoreInteractions(rolService);
    }

    @Test
    void testRemoveRol_ExistingRol_ReturnsSuccessMessage() {
        Long id = 1L;

        when(rolService.removeRol(id)).thenReturn(true);

        ResponseEntity<?> response = rolController.removeRol(id);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertEquals("Message: Role was delete", response.getBody());

        verify(rolService).removeRol(id);
        verifyNoMoreInteractions(rolService);
    }

    @Test
    void testRemoveRol_NonExistingRol_ReturnsNotFound() {
        Long id = 1L;

        when(rolService.removeRol(id)).thenReturn(false);

        ResponseEntity<?> response = rolController.removeRol(id);

        assertSame(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Message: The role " + id + " does not exist", response.getBody());

        verify(rolService).removeRol(id);
        verifyNoMoreInteractions(rolService);
    }
}

