package com.grupo9.digitalBooking.music.model.service.InterfacesService;

import com.grupo9.digitalBooking.music.model.DTO.CategoryDTO;

import java.util.Set;

public interface ICategoryService {

    CategoryDTO createCategory(CategoryDTO categoryDTO);
    CategoryDTO readCategory(Long id);
    CategoryDTO modifyCategory(CategoryDTO categoryDTO);
    Boolean removeCategory(Long id);
    Set<CategoryDTO> getAll();

}
