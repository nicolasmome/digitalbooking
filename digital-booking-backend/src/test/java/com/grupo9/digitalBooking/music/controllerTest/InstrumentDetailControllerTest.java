package com.grupo9.digitalBooking.music.controllerTest;

import com.grupo9.digitalBooking.music.model.DTO.InstrumentDetailDTO;
import com.grupo9.digitalBooking.music.model.controller.InstrumentDetailController;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IInstrumentDetailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class InstrumentDetailControllerTest {
    @Mock
    private IInstrumentDetailService instrumentDetailService;

    @InjectMocks
    private InstrumentDetailController instrumentDetailController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateInstrumentDetail() {
        InstrumentDetailDTO instrumentDetailDTO = new InstrumentDetailDTO();
        instrumentDetailDTO.setId(1L);
        instrumentDetailDTO.setDescription("Test description");

        ResponseEntity<?> responseEntity = instrumentDetailController.createInstrumentDetail(instrumentDetailDTO);

        verify(instrumentDetailService, times(1)).createInstrumentDetail(instrumentDetailDTO);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetInstrumentDetail() {
        Long id = 1L;
        InstrumentDetailDTO instrumentDetailDTO = new InstrumentDetailDTO();
        instrumentDetailDTO.setId(id);
        instrumentDetailDTO.setDescription("Test description");

        when(instrumentDetailService.readInstrumentDetail(id)).thenReturn(instrumentDetailDTO);

        InstrumentDetailDTO result = instrumentDetailController.getInstrumentDetail(id);

        verify(instrumentDetailService, times(1)).readInstrumentDetail(id);
        assertEquals(instrumentDetailDTO, result);
    }

    @Test
    public void testModifyInstrumentDetail() {
        InstrumentDetailDTO instrumentDetailDTO = new InstrumentDetailDTO();
        instrumentDetailDTO.setId(1L);
        instrumentDetailDTO.setDescription("Test description");

        ResponseEntity<?> responseEntity = instrumentDetailController.modifyInstrumentDetail(instrumentDetailDTO);

        verify(instrumentDetailService, times(1)).modifyInstrumentDetail(instrumentDetailDTO);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testRemoveInstrumentDetail() {
        Long id = 1L;

        ResponseEntity<?> responseEntity = instrumentDetailController.removeInstrumentDetail(id);

        verify(instrumentDetailService, times(1)).removeInstrumentDetail(id);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetAllInstrumentDetails() {
        Set<InstrumentDetailDTO> instrumentDetailDTOSet = new HashSet<>();
        InstrumentDetailDTO instrumentDetailDTO1 = new InstrumentDetailDTO();
        instrumentDetailDTO1.setId(1L);
        instrumentDetailDTO1.setDescription("Test description 1");
        InstrumentDetailDTO instrumentDetailDTO2 = new InstrumentDetailDTO();
        instrumentDetailDTO2.setId(2L);
        instrumentDetailDTO2.setDescription("Test description 2");
        instrumentDetailDTOSet.add(instrumentDetailDTO1);
        instrumentDetailDTOSet.add(instrumentDetailDTO2);

        when(instrumentDetailService.getAll()).thenReturn(instrumentDetailDTOSet);

        Set<InstrumentDetailDTO> result = (Set<InstrumentDetailDTO>) instrumentDetailController.getAllInstrumentDetails();

        verify(instrumentDetailService, times(1)).getAll();
        assertEquals(instrumentDetailDTOSet, result);
    }
}


