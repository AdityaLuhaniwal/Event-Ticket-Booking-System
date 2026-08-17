package com.aditya.eventbooking.controller;

import com.aditya.eventbooking.dto.PaymentRequest;
import com.aditya.eventbooking.dto.PaymentResponse;
import com.aditya.eventbooking.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aditya.eventbooking.dto.PaymentVerifyRequest;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public PaymentResponse createOrder(@RequestBody PaymentRequest request) {

        try {
            return paymentService.createOrder(request);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    // Verify Payment
    @PostMapping("/verify")
    public String verifyPayment(@RequestBody PaymentVerifyRequest request) throws Exception {

        return paymentService.verifyPayment(request);

    }
}