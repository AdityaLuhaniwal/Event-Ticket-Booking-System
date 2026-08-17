package com.aditya.eventbooking.service;

import com.aditya.eventbooking.dto.PaymentRequest;
import com.aditya.eventbooking.dto.PaymentResponse;
import com.aditya.eventbooking.entity.Booking;
import com.aditya.eventbooking.repository.BookingRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.aditya.eventbooking.dto.PaymentVerifyRequest;
import com.razorpay.Utils;

@Service
public class PaymentService {

    @Autowired
    private BookingRepository bookingRepository;

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    // Create Razorpay Order
    public PaymentResponse createOrder(PaymentRequest request) throws Exception {

        System.out.println("Razorpay Key = " + keyId);

        // Booking Find
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking Not Found"));

        // Razorpay Client
        RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

        // Amount (Paise)
        int amount = booking.getTotalAmount().intValue() * 100;

        // JSON Request
        JSONObject options = new JSONObject();
        options.put("amount", amount);
        options.put("currency", "INR");
        options.put("receipt", "booking_" + booking.getId());

        // Create Order
        Order order = razorpayClient.orders.create(options);

        // Save Order Id
        booking.setRazorpayOrderId(order.get("id"));
        booking.setPaymentStatus("CREATED");

        bookingRepository.save(booking);

        // Response
        return PaymentResponse.builder()
                .orderId(order.get("id"))
                .amount(amount)
                .currency("INR")
                .key(keyId)
                .build();
    }

    // Verify Payment
    public String verifyPayment(PaymentVerifyRequest request) throws Exception {

        // Verify Signature
        JSONObject options = new JSONObject();

        options.put("razorpay_order_id", request.getRazorpayOrderId());
        options.put("razorpay_payment_id", request.getRazorpayPaymentId());
        options.put("razorpay_signature", request.getRazorpaySignature());

        boolean isValid = Utils.verifyPaymentSignature(options, keySecret);

        if (!isValid) {
            throw new RuntimeException("Invalid Payment Signature");
        }

        Booking booking = bookingRepository
                .findAll()
                .stream()
                .filter(b -> request.getRazorpayOrderId().equals(b.getRazorpayOrderId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Booking Not Found"));

        booking.setRazorpayPaymentId(request.getRazorpayPaymentId());
        booking.setPaymentStatus("PAID");
        booking.setBookingStatus("CONFIRMED");

        bookingRepository.save(booking);

        return "Payment Verified Successfully";
    }
}