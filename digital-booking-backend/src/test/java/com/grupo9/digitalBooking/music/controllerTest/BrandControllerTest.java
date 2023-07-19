package com.grupo9.digitalBooking.music.controllerTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.*;

import java.util.HashSet;
import java.util.Set;

import com.grupo9.digitalBooking.music.model.controller.BrandController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.grupo9.digitalBooking.music.model.DTO.BrandDTO;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IBrandService;

class BrandControllerTest {

    @Mock
    private IBrandService brandService;

    @InjectMocks
    private BrandController brandController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateBrand_NewBrand_ReturnsCreatedBrand() {
        BrandDTO brandDTO = new BrandDTO();
        brandDTO.setId(1L);
        brandDTO.setName("Brand 1");
        brandDTO.setImage("brand1.png");

        when(brandService.createBrand(brandDTO)).thenReturn(brandDTO);

        ResponseEntity<?> response = brandController.createBrand(brandDTO);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(brandDTO, response.getBody());

        verify(brandService).createBrand(brandDTO);
        verifyNoMoreInteractions(brandService);
    }

    @Test
    void testCreateBrand_ExistingBrand_ReturnsBadRequest() {
        BrandDTO brandDTO = new BrandDTO();
        brandDTO.setId(1L);
        brandDTO.setName("Brand 1");
        brandDTO.setImage("brand1.png");

        when(brandService.createBrand(brandDTO)).thenReturn(null);

        ResponseEntity<?> response = brandController.createBrand(brandDTO);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The Brand already exists", response.getBody());

        verify(brandService).createBrand(brandDTO);
        verifyNoMoreInteractions(brandService);
    }

    @Test
    void testGetBrand_ExistingId_ReturnsBrandDTO() {
        Long id = 1L;
        BrandDTO brandDTO = new BrandDTO();
        brandDTO.setId(id);
        brandDTO.setName("Brand 1");
        brandDTO.setImage("brand1.png");

        when(brandService.readBrand(id)).thenReturn(brandDTO);

        ResponseEntity<?> response = brandController.getBrand(id);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(brandDTO, response.getBody());

        verify(brandService).readBrand(id);
        verifyNoMoreInteractions(brandService);
    }

    @Test
    void testGetBrand_NonExistingId_ReturnsNotFound() {
        Long id = 1L;

        when(brandService.readBrand(id)).thenReturn(null);

        ResponseEntity<?> response = brandController.getBrand(id);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The Brand with " + id + " does not exist", response.getBody());

        verify(brandService).readBrand(id);
        verifyNoMoreInteractions(brandService);
    }

    @Test
    void testModifyBrand_ExistingBrand_ReturnsUpdatedBrand() {
        BrandDTO brandDTO = new BrandDTO();
        brandDTO.setId(1L);
        brandDTO.setName("Brand 1");
        brandDTO.setImage("brand1.png");

        when(brandService.modifyBrand(brandDTO)).thenReturn(brandDTO);

        ResponseEntity<?> response = brandController.modifyBrand(brandDTO);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(brandDTO, response.getBody());

        verify(brandService).modifyBrand(brandDTO);
        verifyNoMoreInteractions(brandService);
    }

    @Test
    void testModifyBrand_NonExistingBrand_ReturnsNotFound() {
        BrandDTO brandDTO = new BrandDTO();
        brandDTO.setId(1L);
        brandDTO.setName("Brand 1");
        brandDTO.setImage("brand1.png");

        when(brandService.modifyBrand(brandDTO)).thenReturn(null);

        ResponseEntity<?> response = brandController.modifyBrand(brandDTO);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The Brand with " + brandDTO.getId() + " does not exist", response.getBody());

        verify(brandService).modifyBrand(brandDTO);
        verifyNoMoreInteractions(brandService);
    }

    @Test
    void testRemoveBrand_ExistingBrand_ReturnsSuccessMessage() {
        Long id = 1L;

        when(brandService.removeBrand(id)).thenReturn(true);

        ResponseEntity<?> response = brandController.removeBrand(id);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertEquals("Message: Brand was delete", response.getBody());

        verify(brandService).removeBrand(id);
        verifyNoMoreInteractions(brandService);
    }

    @Test
    void testRemoveBrand_NonExistingBrand_ReturnsNotFound() {
        Long id = 1L;

        when(brandService.removeBrand(id)).thenReturn(false);

        ResponseEntity<?> response = brandController.removeBrand(id);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The Brand with " + id + " does not exist", response.getBody());

        verify(brandService).removeBrand(id);
        verifyNoMoreInteractions(brandService);
    }

    @Test
    void testGetallBrands_ExistingBrands_ReturnsBrandDTOSet() {
        Set<BrandDTO> brands = new HashSet<>();
        BrandDTO brand1 = new BrandDTO();
        brand1.setId(1L);
        brand1.setName("Brand 1");
        brand1.setImage("brand1.png");
        BrandDTO brand2 = new BrandDTO();
        brand2.setId(2L);
        brand2.setName("Brand 2");
        brand2.setImage("brand2.png");
        brands.add(brand1);
        brands.add(brand2);

        when(brandService.getAll()).thenReturn(brands);

        ResponseEntity<?> response = brandController.getallBrands();

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(brands, response.getBody());

        verify(brandService).getAll();
        verifyNoMoreInteractions(brandService);
    }

    @Test
    void testGetallBrands_NoBrands_ReturnsBadRequest() {
        Set<BrandDTO> brands = new HashSet<>();

        when(brandService.getAll()).thenReturn(brands);

        ResponseEntity<?> response = brandController.getallBrands();

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: There are not information", response.getBody());

        verify(brandService).getAll();
        verifyNoMoreInteractions(brandService);
    }
}


