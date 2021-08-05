package com.camtougo.backendCamtougo.jePropose.colis;

import com.camtougo.backendCamtougo.jePropose.voyage.VoyageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class ColisController {

    @Autowired
    private ColisService colisService;

    // Add Travel
    @PostMapping("/{userId}/je_propose_colis")
    public ColisRequest addColis(@PathVariable(value = "userId") Long userId, @RequestBody ColisRequest colisRequest) {

        return colisService.savedColis(userId, colisRequest);
    }

    // Get Travel by Id
    @GetMapping("/{userId}/colis")
    public List<ColisRequest> getAllColisByUserId(@PathVariable (value = "userId") Long userId) {
        return colisService.getAllColissByUserId(userId);
    }

}
