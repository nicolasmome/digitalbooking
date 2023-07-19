package com.grupo9.digitalBooking.music.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo9.digitalBooking.music.model.DTO.RolDTO;
import com.grupo9.digitalBooking.music.model.entities.Category;
import com.grupo9.digitalBooking.music.model.DTO.CategoryDTO;
import com.grupo9.digitalBooking.music.model.repository.ICategory;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategory categoryRepository;

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(RolService.class));

    @Autowired
    ObjectMapper mapper;

    private CategoryDTO saveCategory(CategoryDTO categoryDTO){
        Category category =mapper.convertValue(categoryDTO, Category.class);
        CategoryDTO result = mapper.convertValue(categoryRepository.save(category), CategoryDTO.class);
        return result;
    }

    public Boolean existById(Long id) {
        return categoryRepository.findById(id).isPresent();
    }

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        CategoryDTO response = null;
        Boolean existCategory = categoryRepository.findByName(categoryDTO.getName()).isPresent();
        if(!existCategory) {
            response = saveCategory(categoryDTO);
        }
        LOGGER.info("respuesta: " + response);
        return response;
    }

    @Override
    public CategoryDTO readCategory(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        CategoryDTO categoryDTO = null;
        if(category.isPresent())
            categoryDTO = mapper.convertValue(category, CategoryDTO.class);

        return categoryDTO;
    }


    @Override
    public CategoryDTO modifyCategory(CategoryDTO categoryDTO) {

        CategoryDTO response = null;
        Boolean validateCategory = existById(categoryDTO.getId());

        if(validateCategory) {
            response = saveCategory(categoryDTO);
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Boolean removeCategory(Long id) {
        Boolean response = false;
        Boolean exist = existById(id);
        if(exist) {
            categoryRepository.deleteById(id);
            response = true;
        }
        LOGGER.info("response: " + response);
        return response;
    }

    @Override
    public Set<CategoryDTO> getAll() {
        List<Category> categories = categoryRepository.findAll();
        Set<CategoryDTO> categoryDTO = new HashSet<>();

        for (Category category : categories) {
            categoryDTO.add(mapper.convertValue(category, CategoryDTO.class));
        }

        return categoryDTO;

    }
}
