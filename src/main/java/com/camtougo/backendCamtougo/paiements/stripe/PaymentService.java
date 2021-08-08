package com.camtougo.backendCamtougo.paiements.stripe;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.camtougo.backendCamtougo.paiements.stripe.http.PaymentIntentDto;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.EphemeralKey;
import com.stripe.model.PaymentIntent;
import com.stripe.net.RequestOptions;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.EphemeralKeyCreateParams;
import com.stripe.param.PaymentIntentCreateParams;

@Service
public class PaymentService {

    @Value("${stripe.key.secret}")
    String secretKey;

    public PaymentIntent paymentIntent(PaymentIntentDto paymentIntentDto) throws StripeException {
        Stripe.apiKey = secretKey;
        List<String> paymentMethodTypes = new ArrayList();
        paymentMethodTypes.add("card");
        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentIntentDto.getAmount());
        params.put("currency", paymentIntentDto.getCurrency());
        params.put("description", paymentIntentDto.getDescription());
        params.put("payment_method_types", paymentMethodTypes);
        return PaymentIntent.create(params);
    }
    
    public Object paymentIntentFirst(PaymentIntentDto paymentIntentDto) throws StripeException {
    	CustomerCreateParams customerParams = CustomerCreateParams.builder().build();
    	  Customer customer = Customer.create(customerParams);

    	  EphemeralKeyCreateParams ephemeralKeyParams =
    	    EphemeralKeyCreateParams.builder()
    	      .setCustomer(customer.getId())
    	      .build();

    	  RequestOptions ephemeralKeyOptions =
    	    RequestOptions.builder()
    	      .setStripeVersionOverride("2020-08-27")
    	      .build();

    	  EphemeralKey ephemeralKey = EphemeralKey.create(
    	    ephemeralKeyParams,
    	    ephemeralKeyOptions);

    	  PaymentIntentCreateParams paymentIntentParams =
    	  PaymentIntentCreateParams.builder()
    	    .setAmount((long) paymentIntentDto.getAmount())
    	    .setCurrency(paymentIntentDto.getStringCurrency())
    	    .setCustomer(customer.getId())
    	    .build();
    	  PaymentIntent paymentIntent = PaymentIntent.create(paymentIntentParams);

    	  Map<String, String> responseData = new HashMap();
    	  responseData.put("paymentIntent", paymentIntent.getClientSecret());
    	  responseData.put("ephemeralKey", ephemeralKey.getSecret());
    	  responseData.put("customer", customer.getId());

    	  return responseData;
    }
    
    

    public PaymentIntent confirm(String id) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(id);
        Map<String, Object> params = new HashMap<>();
        params.put("payment_method", "pm_card_visa");
        paymentIntent.confirm(params);
        return paymentIntent;
    }

    public PaymentIntent cancel(String id) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(id);
        paymentIntent.cancel();
        return paymentIntent;
    }
}
