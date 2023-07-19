package com.grupo9.digitalBooking.music.controllerTest;

import com.grupo9.digitalBooking.music.model.DTO.CategoryDTO;
import com.grupo9.digitalBooking.music.model.controller.CategoryController;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.ICategoryService;
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

class CategoryControllerTest {

    @Mock
    private ICategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCategory_ValidCategory_ReturnsOkResponse() {
        // Arrange
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName("Test Category");
        categoryDTO.setDescription("Test Description");
        categoryDTO.setImage("http://example.com/image.jpg");

        when(categoryService.createCategory(categoryDTO)).thenReturn(categoryDTO);

        // Act
        ResponseEntity<?> response = categoryController.createCategory(categoryDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(categoryDTO, response.getBody());

        verify(categoryService, times(1)).createCategory(categoryDTO);
    }

    @Test
    void getCategory_ExistingCategory_ReturnsOkResponse() {
        // Arrange
        Long categoryId = 1L;
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(categoryId);
        categoryDTO.setName("Test Category");
        categoryDTO.setDescription("Test Description");
        categoryDTO.setImage("http://example.com/image.jpg");

        when(categoryService.readCategory(categoryId)).thenReturn(categoryDTO);

        // Act
        ResponseEntity<?> response = categoryController.getCategory(categoryId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(categoryDTO, response.getBody());

        verify(categoryService, times(1)).readCategory(categoryId);
    }

    @Test
    void modifyCategory_ExistingCategory_ReturnsOkResponse() {
        // Arrange
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(1L);
        categoryDTO.setName("Test Category");
        categoryDTO.setDescription("Test Description");
        categoryDTO.setImage("http://example.com/image.jpg");

        when(categoryService.modifyCategory(categoryDTO)).thenReturn(categoryDTO);

        // Act
        ResponseEntity<?> response = categoryController.modifyCategory(categoryDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(categoryDTO, response.getBody());

        verify(categoryService, times(1)).modifyCategory(categoryDTO);
    }

    @Test
    void removeCategory_ExistingCategory_ReturnsOkResponse() {
        // Arrange
        Long categoryId = 1L;

        when(categoryService.removeCategory(categoryId)).thenReturn(true);

        // Act
        ResponseEntity<?> response = categoryController.removeCategory(categoryId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Message: Category was delete", response.getBody());

        verify(categoryService, times(1)).removeCategory(categoryId);
    }

    @Test
    void getallCategories_HasCategories_ReturnsOkResponse() {
        // Arrange
        CategoryDTO categoryDTO1 = new CategoryDTO();
        categoryDTO1.setId(1L);
        categoryDTO1.setName("Category 1");
        categoryDTO1.setDescription("Description 1");
        categoryDTO1.setImage("http://example1.com/image1.jpg");

        CategoryDTO categoryDTO2 = new CategoryDTO();
        categoryDTO2.setId(2L);
        categoryDTO2.setName("Category 2");
        categoryDTO2.setDescription("Description 2");
        categoryDTO2.setImage("http://example2.com/image2.jpg");

        Set<CategoryDTO> categories = new HashSet<>();
        categories.add(categoryDTO1);
        categories.add(categoryDTO2);

        when(categoryService.getAll()).thenReturn(categories);

        // Act
        ResponseEntity<?> response = categoryController.getallCategories();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(categories, response.getBody());

        verify(categoryService, times(1)).getAll();
    }
}

