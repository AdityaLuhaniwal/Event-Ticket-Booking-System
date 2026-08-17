package com.aditya.eventbooking.controller;

import com.aditya.eventbooking.dto.BookingRequest;
import com.aditya.eventbooking.dto.BookingResponse;
import com.aditya.eventbooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Book Ticket
    @PostMapping
    public BookingResponse bookTicket(@RequestBody BookingRequest request) {
        return bookingService.bookTicket(request);
    }

    // Get All Bookings
    @GetMapping
    public List<BookingResponse> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Get User Bookings
    @GetMapping("/user/{userId}")
    public List<BookingResponse> getBookingsByUserId(
            @PathVariable Long userId) {

        return bookingService.getBookingsByUserId(userId);
    }

    // Get Booking By Id
    @GetMapping("/{id}")
    public BookingResponse getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    // Cancel Booking
    @DeleteMapping("/{id}")
    public String cancelBooking(@PathVariable Long id) {
        return bookingService.cancelBooking(id);
    }
}