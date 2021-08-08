package com.camtougo.backendCamtougo.paiements.stripe.http;

public class PaymentIntentDto {
    public enum Currency{
        xaf;
    }

    private String description;
    private double amount;
    private Currency currency;


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Currency getCurrency() {
        return currency;
    }
    
    public String getStringCurrency() {
        return currency + "";
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }


}
