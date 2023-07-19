package com.grupo9.digitalBooking.music.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo9.digitalBooking.music.model.DTO.CategoryDTO;
import com.grupo9.digitalBooking.music.model.DTO.ImageDTO;
import com.grupo9.digitalBooking.music.model.entities.Branch;
import com.grupo9.digitalBooking.music.model.entities.Category;
import com.grupo9.digitalBooking.music.model.entities.Image;
import com.grupo9.digitalBooking.music.model.repository.IBranch;
import com.grupo9.digitalBooking.music.model.repository.IImage;
import com.grupo9.digitalBooking.music.model.repository.IInstrument;
import com.grupo9.digitalBooking.music.model.service.InterfacesService.IInstrumentService;
import com.grupo9.digitalBooking.music.model.DTO.InstrumentDTO;
import com.grupo9.digitalBooking.music.model.entities.Instrument;
import org.aspectj.apache.bcel.generic.LOOKUPSWITCH;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.logging.Logger;

@Service
public class InstrumentService implements IInstrumentService {

    @Autowired
    private IInstrument instrumentRepository;

    @Autowired
    private IImage imageRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private IBranch branchRepository;
    @Autowired
    ObjectMapper mapper;

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(InstrumentService.class));


    private InstrumentDTO saveInstrument(InstrumentDTO instrumentDTO){
        Instrument instrument =mapper.convertValue(instrumentDTO, Instrument.class);
        return mapper.convertValue(instrumentRepository.save(instrument), InstrumentDTO.class);
    }

    private Boolean existById(Long id) {
        return instrumentRepository.findById(id).isPresent();
    }

    @Override
    public InstrumentDTO createInstrument(InstrumentDTO instrumentDTO) {

        InstrumentDTO response = null;
        Boolean existInstrument = instrumentRepository.findByName(instrumentDTO.getName()).isPresent();

        if(!existInstrument) {

            Instrument request = mapper.convertValue(instrumentDTO, Instrument.class);
            request.setImages(null);
            request.setAvailable(true);
            InstrumentDTO newInstrument = saveInstrument(mapper.convertValue(request, InstrumentDTO.class));

            //InstrumentDTO newInstrument = saveInstrument(instrumentDTO);
            List<ImageDTO> imageDTOList = new ArrayList<>();

            instrumentDTO.getImages().forEach(imageDTO -> {
                Image image = mapper.convertValue(imageDTO, Image.class);
                image.setInstrument(mapper.convertValue(newInstrument, Instrument.class));
                image.setName(newInstrument.getName());
                imageRepository.save(image);
                imageDTOList.add(mapper.convertValue(imageRepository.save(image), ImageDTO.class));
            });

            /** TODO: Logica de producto para las reservas*/
            LocalDate dateNow = LocalDate.now();
            newInstrument.setStartReservationDate(dateNow);
            newInstrument.setEndReservationDate(dateNow.plusDays(15));

            newInstrument.setImages(imageDTOList);


            response = newInstrument;
        }

        return response;
    }

    @Override
    public InstrumentDTO readInstrument(Long id) {
        Optional<Instrument> instrument = instrumentRepository.findById(id);
        InstrumentDTO instrumentDTO = null;
        if(instrument.isPresent()) {
            instrumentDTO = mapper.convertValue(instrument, InstrumentDTO.class);
            /** TODO: Logica de producto para las reservas*/
            LocalDate dateNow = LocalDate.now();
            instrumentDTO.setStartReservationDate(dateNow);
            instrumentDTO.setEndReservationDate(dateNow.plusDays(15));

        }

        return instrumentDTO;
    }

    @Override
    public InstrumentDTO modifyInstrument(InstrumentDTO instrumentDTO) {
        InstrumentDTO response = null;
        Boolean validateInstrument = existById(instrumentDTO.getId());
        List<ImageDTO> imagesExist = new ArrayList<>();

        instrumentDTO.getImages().forEach(imageDTO -> {
            LOGGER.info("ImageDTO: " + imageDTO);
            imagesExist.add(imageService.modifyImage(imageDTO));
        });

        //instrumentDTO.setImages(imagesExist);
        if(validateInstrument) {
            response = saveInstrument(instrumentDTO);
        }
        return response;
    }

    @Override
    public Boolean removeInstrument(Long id) {
        Boolean response = false;
        Boolean exist = existById(id);
        if(exist) {

            InstrumentDTO instrumentDTO = readInstrument(id);
            instrumentDTO.getImages().forEach(imageDTO -> {
                imageService.removeImage(imageDTO.getId());
            });

            instrumentRepository.deleteById(id);
            response = true;
        }
        return response;
    }

    @Override
    public List<InstrumentDTO> getAll() {
        List<Instrument> instruments = instrumentRepository.findAll();
        List<InstrumentDTO> instrumentDTOS = new ArrayList<>();

        for (Instrument instrument1 : instruments) {

            InstrumentDTO instrumentDTO = mapper.convertValue(instrument1, InstrumentDTO.class);

            /** TODO: Logica de producto para las reservas*/
            LocalDate dateNow = LocalDate.now();
            instrumentDTO.setStartReservationDate(dateNow);
            instrumentDTO.setEndReservationDate(dateNow.plusDays(15));

            instrumentDTOS.add(instrumentDTO);

        }
        return instrumentDTOS;
    }

    @Override
    public List<InstrumentDTO> getInstrumentsByCategory(Long id) {
        // Category category = mapper.convertValue(nstrumentRepository.findById(id), Category.class);
        // LOGGER.info("categoryId2: " + category);
        List<Instrument> instruments = instrumentRepository.findByCategoryId(id);
        List<InstrumentDTO> instrumentDTOList = new ArrayList<>();
        instruments.forEach(instrument -> {
            InstrumentDTO instrumentDTO = mapper.convertValue(instrument, InstrumentDTO.class);

            /** TODO: Logica de producto para las reservas*/
            LocalDate dateNow = LocalDate.now();
            instrumentDTO.setStartReservationDate(dateNow);
            instrumentDTO.setEndReservationDate(dateNow.plusDays(8));

            instrumentDTOList.add(mapper.convertValue(instrument, InstrumentDTO.class));
        });

        System.out.println("===== Categorys =====");
        instrumentDTOList.forEach((instrument) -> LOGGER.info("Instrument: " + instrument));
        return instrumentDTOList;
    }

    public List<InstrumentDTO> getInstrumentByCity(String city) {
        Branch branch = mapper.convertValue(branchRepository.findByCity(city), Branch.class);

        List<Instrument> instrumentList = instrumentRepository.findByBranchId(branch.getId());
        //List<Instrument> instrumentList = instrumentRepository.findInstrumentsByBranch(branch.getId());

        List<InstrumentDTO> instrumentDTOList = new ArrayList<>();
        instrumentList.forEach(instrument -> instrumentDTOList.add(mapper.convertValue(instrument, InstrumentDTO.class)));

        return instrumentDTOList;
    }
}
