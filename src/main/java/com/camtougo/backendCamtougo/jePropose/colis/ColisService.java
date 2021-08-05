package com.camtougo.backendCamtougo.jePropose.colis;

import com.camtougo.backendCamtougo.exception.ResourceNotFoundException;
import com.camtougo.backendCamtougo.jePropose.voyage.VoyageRequest;
import com.camtougo.backendCamtougo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColisService {

    @Autowired
    private ColisRepository colisRepository;

    @Autowired
    private UserRepository userRepository;

    // List By Id
    public List<ColisRequest> getAllColissByUserId(Long userId) {
        return colisRepository.findByUserId(userId);
    }

    // Propose Colis
    public ColisRequest savedColis(Long userId, ColisRequest colisRequest){
        return userRepository.findById(userId).map(user -> {
            colisRequest.setUser(user);
            return colisRepository.save(colisRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("userId " + userId + " not found"));
    }
}
