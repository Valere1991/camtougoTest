package com.camtougo.backendCamtougo.jePropose.voyage;

import com.camtougo.backendCamtougo.exception.ResourceNotFoundException;
import com.camtougo.backendCamtougo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class VoyageService {

    private final VoyageCriteriaRepository voyageCriteriaRepository;

    @Autowired
    private VoyageRepository voyageRepository;

    @Autowired
    private UserRepository userRepository;

    // List By Id
    public List<VoyageRequest> getAllTravelsByUserId(Long userId) {
        return voyageRepository.findByUserId(userId);
    }

    // Propose Voyage
    public VoyageRequest savedTravel(Long userId, VoyageRequest voyageRequest){
        return userRepository.findById(userId).map(user -> {
            voyageRequest.setUser(user);
            return voyageRepository.save(voyageRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("userId " + userId + " not found"));
    }

    // Update Voyage
    public VoyageRequest updateVoyage(Long userId, Long travelId, VoyageRequest voyageRequest) {
        if(!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("userId " + userId + " not found");
        }
        return voyageRepository.findById(travelId).map(voyageRequest1 -> {
            voyageRequest1.setStartCity(voyageRequest.getStartCity());
            voyageRequest1.setEndCity(voyageRequest.getEndCity());
            voyageRequest1.setTravelDate(voyageRequest.getTravelDate());
            voyageRequest1.setTravelTime(voyageRequest.getTravelTime());
            voyageRequest1.setNumberOfPlace(voyageRequest.getNumberOfPlace());
            voyageRequest1.setTravelPrice(voyageRequest.getTravelPrice());
            voyageRequest1.setStartPoint(voyageRequest.getStartPoint());
            voyageRequest1.setCarDetails(voyageRequest.getCarDetails());
            voyageRequest1.setBaggageDetails(voyageRequest.getBaggageDetails());

            return voyageRepository.save(voyageRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("travelId " + travelId + " not found"));
    }

    // List Pageable
    public Page<VoyageRequest> getVoyages(VoyageRequestPage voyageRequestPage,
                                          VoyageSearchCriteria voyageSearchCriteria){
        return voyageCriteriaRepository.findAllWithFilters(voyageRequestPage, voyageSearchCriteria);
    }
    public VoyageService(VoyageCriteriaRepository voyageCriteriaRepository) {
        this.voyageCriteriaRepository = voyageCriteriaRepository;
    }

    public ResponseEntity<?> deleteVoyage(Long userId, Long travelId) {
        return voyageRepository.findByTravelIdAndUserId(travelId, userId).map(voyageRequest -> {
            voyageRepository.delete(voyageRequest);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Travel not found with id " + travelId + "and userId " + userId));
    }
}
