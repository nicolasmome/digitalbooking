package com.grupo9.digitalBooking.music.controllerTest;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.HashSet;
import java.util.Set;

import com.grupo9.digitalBooking.music.model.controller.ImageController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.grupo9.digitalBooking.music.model.DTO.ImageDTO;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IImageService;

class ImageControllerTest {

    @Mock
    private IImageService imageService;

    @InjectMocks
    private ImageController imageController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateImage_NewImage_ReturnsCreatedImage() {
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(1L);
        imageDTO.setName("Image 1");
        imageDTO.setUrl("https://example.com/image1.jpg");

        when(imageService.createImage(imageDTO)).thenReturn(imageDTO);

        ResponseEntity<?> response = imageController.createImage(imageDTO);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(imageDTO, response.getBody());

        verify(imageService).createImage(imageDTO);
        verifyNoMoreInteractions(imageService);
    }

    @Test
    void testCreateImage_ExistingImage_ReturnsBadRequest() {
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(1L);
        imageDTO.setName("Image 1");
        imageDTO.setUrl("https://example.com/image1.jpg");

        when(imageService.createImage(imageDTO)).thenReturn(null);

        ResponseEntity<?> response = imageController.createImage(imageDTO);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The image already exists", response.getBody());

        verify(imageService).createImage(imageDTO);
        verifyNoMoreInteractions(imageService);
    }

    @Test
    void testGetImage_ExistingImage_ReturnsImage() {
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(1L);
        imageDTO.setName("Image 1");
        imageDTO.setUrl("https://example.com/image1.jpg");

        when(imageService.readImage(1L)).thenReturn(imageDTO);

        ResponseEntity<?> response = imageController.getImage(1L);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(imageDTO, response.getBody());

        verify(imageService).readImage(1L);
        verifyNoMoreInteractions(imageService);
    }

    @Test
    void testGetImage_NonExistingImage_ReturnsBadRequest() {
        when(imageService.readImage(1L)).thenReturn(null);

        ResponseEntity<?> response = imageController.getImage(1L);

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: The image with 1 does not exist", response.getBody());

        verify(imageService).readImage(1L);
        verifyNoMoreInteractions(imageService);
    }

    @Test
    void testModifyImage_ExistingImage_ReturnsModifiedImage() {
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(1L);
        imageDTO.setName("Image 1");
        imageDTO.setUrl("https://example.com/image1.jpg");

        when(imageService.modifyImage(imageDTO)).thenReturn(imageDTO);

        ResponseEntity<?> response = imageController.modifyImage(imageDTO);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertEquals("Message: Image 1 was update", response.getBody());

        verify(imageService).modifyImage(imageDTO);
        verifyNoMoreInteractions(imageService);
    }

    @Test
    void testModifyImage_NonExistingImage_ReturnsNotFound() {
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(1L);
        imageDTO.setName("Image 1");
        imageDTO.setUrl("https://example.com/image1.jpg");

        when(imageService.modifyImage(imageDTO)).thenReturn(null);

        ResponseEntity<?> response = imageController.modifyImage(imageDTO);

        assertSame(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Message: The image 1 does not exist", response.getBody());

        verify(imageService).modifyImage(imageDTO);
        verifyNoMoreInteractions(imageService);
    }

    @Test
    void testRemoveImage_ExistingImage_ReturnsImageDeletedMessage() {
        when(imageService.removeImage(1L)).thenReturn(true);

        ResponseEntity<?> response = imageController.removeImage(1L);

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertEquals("Message: Image was delete", response.getBody());

        verify(imageService).removeImage(1L);
        verifyNoMoreInteractions(imageService);
    }

    @Test
    void testRemoveImage_NonExistingImage_ReturnsNotFound() {
        when(imageService.removeImage(1L)).thenReturn(false);

        ResponseEntity<?> response = imageController.removeImage(1L);

        assertSame(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Message: The image 1 does not exist", response.getBody());

        verify(imageService).removeImage(1L);
        verifyNoMoreInteractions(imageService);
    }

    @Test
    void testGetAllImages_ExistingImages_ReturnsImages() {
        Set<ImageDTO> images = new HashSet<>();
        ImageDTO imageDTO1 = new ImageDTO();
        imageDTO1.setId(1L);
        imageDTO1.setName("Image 1");
        imageDTO1.setUrl("https://example.com/image1.jpg");
        ImageDTO imageDTO2 = new ImageDTO();
        imageDTO2.setId(2L);
        imageDTO2.setName("Image 2");
        imageDTO2.setUrl("https://example.com/image2.jpg");
        images.add(imageDTO1);
        images.add(imageDTO2);

        when(imageService.getAll()).thenReturn(images);

        ResponseEntity<?> response = imageController.getallImages();

        assertSame(HttpStatus.OK, response.getStatusCode());
        assertSame(images, response.getBody());

        verify(imageService).getAll();
        verifyNoMoreInteractions(imageService);
    }

    @Test
    void testGetAllImages_NoImages_ReturnsBadRequest() {
        Set<ImageDTO> images = new HashSet<>();

        when(imageService.getAll()).thenReturn(images);

        ResponseEntity<?> response = imageController.getallImages();

        assertSame(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Message: There are not information", response.getBody());

        verify(imageService).getAll();
        verifyNoMoreInteractions(imageService);
    }
}

