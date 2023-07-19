package com.grupo9.digitalBooking.music.controllerTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.*;

import java.util.HashSet;
import java.util.Set;
import java.util.logging.Logger;

import com.grupo9.digitalBooking.music.model.controller.StatusController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.grupo9.digitalBooking.music.model.DTO.StatusDTO;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IStatusService;

class StatusControllerTest {

    @Mock
    private IStatusService statusService;

    @InjectMocks
    private StatusController statusController;

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(StatusController.class));

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateStatus_NewStatus_ReturnsCreatedStatus() {
        StatusDTO statusDTO = new StatusDTO();
        statusDTO.setId(1L);
        statusDTO.setName("Status 1");

        when(statusService.createStatus(statusDTO)).thenReturn(null);

        ResponseEntity<?> response = statusController.createStatus(statusDTO);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The category already exists", response.getBody());

        verify(statusService).createStatus(statusDTO);
        verifyNoMoreInteractions(statusService);
    }

    @Test
    void testCreateStatus_ExistingStatus_ReturnsBadRequest() {
        StatusDTO statusDTO = new StatusDTO();
        statusDTO.setId(1L);
        statusDTO.setName("Status 1");

        when(statusService.createStatus(statusDTO)).thenReturn(null);

        ResponseEntity<?> response = statusController.createStatus(statusDTO);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The category already exists", response.getBody());

        verify(statusService).createStatus(statusDTO);
        verifyNoMoreInteractions(statusService);
    }

    @Test
    void testGetStatus_ExistingId_ReturnsStatusDTO() {
        Long id = 1L;
        StatusDTO statusDTO = new StatusDTO();
        statusDTO.setId(id);
        statusDTO.setName("Status 1");

        when(statusService.readStatus(id)).thenReturn(statusDTO);

        ResponseEntity<?> response = statusController.getStatus(id);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(statusDTO, response.getBody());

        verify(statusService).readStatus(id);
        verifyNoMoreInteractions(statusService);
    }

    @Test
    void testGetStatus_NonExistingId_ReturnsNotFound() {
        Long id = 1L;

        when(statusService.readStatus(id)).thenReturn(null);

        ResponseEntity<?> response = statusController.getStatus(id);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The status with " + id + " does not exist", response.getBody());

        verify(statusService).readStatus(id);
        verifyNoMoreInteractions(statusService);
    }

    @Test
    void testModifyStatus_ExistingStatus_ReturnsUpdatedStatus() {
        StatusDTO statusDTO = new StatusDTO();
        statusDTO.setId(1L);
        statusDTO.setName("Status 1");

        when(statusService.modifyStatus(statusDTO)).thenReturn(statusDTO);

        ResponseEntity<?> response = statusController.modifyStatus(statusDTO);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(statusDTO, response.getBody());

        verify(statusService).modifyStatus(statusDTO);
        verifyNoMoreInteractions(statusService);
    }

    @Test
    void testModifyStatus_NonExistingStatus_ReturnsNotFound() {
        StatusDTO statusDTO = new StatusDTO();
        statusDTO.setId(1L);
        statusDTO.setName("Status 1");

        when(statusService.modifyStatus(statusDTO)).thenReturn(null);

        ResponseEntity<?> response = statusController.modifyStatus(statusDTO);

        assertSame(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Message: The status " + statusDTO.getId() + " does not exist", response.getBody());

        verify(statusService).modifyStatus(statusDTO);
        verifyNoMoreInteractions(statusService);
    }

    @Test
    void testRemoveStatus_ExistingStatus_ReturnsSuccessMessage() {
        Long id = 1L;

        when(statusService.removeStatus(id)).thenReturn(true);

        ResponseEntity<?> response = statusController.removeStatus(id);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertEquals("Message: Status was delete", response.getBody());

        verify(statusService).removeStatus(id);
        verifyNoMoreInteractions(statusService);
    }

    @Test
    void testRemoveStatus_NonExistingStatus_ReturnsNotFound() {
        Long id = 1L;

        when(statusService.removeStatus(id)).thenReturn(false);

        ResponseEntity<?> response = statusController.removeStatus(id);

        assertSame(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Message: The category " + id + " does not exist", response.getBody());

        verify(statusService).removeStatus(id);
        verifyNoMoreInteractions(statusService);
    }

    @Test
    void testGetallStatus_ExistingStatus_ReturnsStatusDTOSet() {
        Set<StatusDTO> statuses = new HashSet<>();
        StatusDTO status1 = new StatusDTO();
        status1.setId(1L);
        status1.setName("Status 1");
        StatusDTO status2 = new StatusDTO();
        status2.setId(2L);
        status2.setName("Status 2");
        statuses.add(status1);
        statuses.add(status2);

        when(statusService.getAll()).thenReturn(statuses);

        ResponseEntity<?> response = statusController.getallStatus();

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(statuses, response.getBody());

        verify(statusService).getAll();
        verifyNoMoreInteractions(statusService);
    }

    @Test
    void testGetallStatus_NoStatus_ReturnsBadRequest() {
        Set<StatusDTO> statuses = new HashSet<>();

        when(statusService.getAll()).thenReturn(statuses);

        ResponseEntity<?> response = statusController.getallStatus();

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: There are not information", response.getBody());

        verify(statusService).getAll();
        verifyNoMoreInteractions(statusService);
    }
}

