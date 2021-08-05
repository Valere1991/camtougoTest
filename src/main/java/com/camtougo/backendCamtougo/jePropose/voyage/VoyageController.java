package com.camtougo.backendCamtougo.jePropose.voyage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class VoyageController {

    @Autowired
    private VoyageService voyageService;

    // Add Travel
    @PostMapping("/{userId}/je_propose_voyage")
    public VoyageRequest addTravel(@PathVariable (value = "userId") Long userId, @RequestBody VoyageRequest voyageRequest) {

        return voyageService.savedTravel(userId, voyageRequest);
    }

    // Get Travel by Id
    @GetMapping("/{userId}/voyages")
    public List<VoyageRequest> getAllTravelsByUserId(@PathVariable (value = "userId") Long userId) {
        return voyageService.getAllTravelsByUserId(userId);
    }

    // Get Travels
    @GetMapping("/voyages")
    public ResponseEntity<Page<VoyageRequest>> getTravels( VoyageRequestPage voyageRequestPage,
                                                          VoyageSearchCriteria voyageSearchCriteria) {
        return new ResponseEntity<>(voyageService.getVoyages(voyageRequestPage, voyageSearchCriteria),
        HttpStatus.OK);
    }

    // Update Travels
    @PutMapping("/{userId}/voyages/{travelId}")
        public VoyageRequest updateVoyages(@PathVariable (value = "userId") Long userId,
                                           @PathVariable (value = "travelId") Long travelId,
                                           @RequestBody VoyageRequest voyageRequest) {
        return voyageService.updateVoyage(userId, travelId, voyageRequest);
    }

    // Delete Travels
    @DeleteMapping("/{userId}/voyages/{travelId}")
    public ResponseEntity<?> deleteTravels(@PathVariable (value = "userId") Long userId,
                                           @PathVariable (value = "travelId") Long travelId) {
        return voyageService.deleteVoyage(userId, travelId);
    }

}
