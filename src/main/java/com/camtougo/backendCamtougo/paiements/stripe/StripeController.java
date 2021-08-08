package com.camtougo.backendCamtougo.paiements.stripe;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camtougo.backendCamtougo.paiements.stripe.http.PaymentIntentDto;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@RestController
@RequestMapping("/stripe")
@CrossOrigin(origins = "*")
public class StripeController {

    @Autowired
    PaymentService paymentService;

//    @PostMapping("/paymentintent")
//    public ResponseEntity<String> payment(@RequestBody PaymentIntentDto paymentIntentDto) throws StripeException {
//        PaymentIntent paymentIntent = paymentService.paymentIntent(paymentIntentDto);
//        String paymentStr = paymentIntent.toJson();
//        return new ResponseEntity<String>(paymentStr, HttpStatus.OK);
//    }
    
    @PostMapping("/paymentintent")
    public Object payment(@RequestBody PaymentIntentDto paymentIntentDto) throws StripeException {
        Object paymentIntent = paymentService.paymentIntentFirst(paymentIntentDto);
        return paymentIntent;
    }

    @PostMapping("/confirm/{id}")
    public ResponseEntity<String> confirm(@PathVariable("id") String id) throws StripeException {
        PaymentIntent paymentIntent = paymentService.confirm(id);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<String>(paymentStr, HttpStatus.OK);
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<String> cancel(@PathVariable("id") String id) throws StripeException {
        PaymentIntent paymentIntent = paymentService.cancel(id);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<String>(paymentStr, HttpStatus.OK);
    }
}
