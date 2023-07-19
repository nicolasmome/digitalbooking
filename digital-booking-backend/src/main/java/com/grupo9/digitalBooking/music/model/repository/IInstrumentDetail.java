package com.grupo9.digitalBooking.music.model.repository;

import com.grupo9.digitalBooking.music.model.entities.Image;
import com.grupo9.digitalBooking.music.model.entities.InstrumentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IInstrumentDetail extends JpaRepository<InstrumentDetail, Long> {

}
