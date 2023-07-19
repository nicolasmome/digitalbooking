package com.grupo9.digitalBooking.music.model.repository;

import com.grupo9.digitalBooking.music.model.entities.Category;
import com.grupo9.digitalBooking.music.model.entities.Instrument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface IInstrument extends JpaRepository<Instrument, Long> {


    Optional<Instrument> findByName(String name);
    List<Instrument> findByCategoryId(Long categoryId);

    Instrument findInstrumentById(Long id);
    List<Instrument> findByBranchId(Long id);
    //List<Instrument> findInstrumentsByBranch(Long id);
}
