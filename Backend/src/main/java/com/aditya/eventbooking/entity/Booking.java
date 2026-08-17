package com.aditya.eventbooking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numberOfTickets;

    private Double totalAmount;

    // PENDING, CONFIRMED, CANCELLED
    private String bookingStatus;

    // Razorpay Order Id
    private String razorpayOrderId;

    // Razorpay Payment Id
    private String razorpayPaymentId;

    // CREATED, PAID, FAILED
    private String paymentStatus;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}