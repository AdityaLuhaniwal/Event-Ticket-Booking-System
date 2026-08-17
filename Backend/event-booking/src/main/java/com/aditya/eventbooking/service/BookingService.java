package com.aditya.eventbooking.service;

import com.aditya.eventbooking.dto.BookingRequest;
import com.aditya.eventbooking.dto.BookingResponse;
import com.aditya.eventbooking.entity.Booking;
import com.aditya.eventbooking.entity.Event;
import com.aditya.eventbooking.entity.User;
import com.aditya.eventbooking.repository.BookingRepository;
import com.aditya.eventbooking.repository.EventRepository;
import com.aditya.eventbooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    // Book Ticket
    public BookingResponse bookTicket(BookingRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Event Not Found"));

        if (event.getAvailableSeats() < request.getNumberOfTickets()) {
            throw new RuntimeException("Not Enough Seats Available");
        }

        double totalAmount = event.getTicketPrice() * request.getNumberOfTickets();

        event.setAvailableSeats(
                event.getAvailableSeats() - request.getNumberOfTickets()
        );

        eventRepository.save(event);

        Booking booking = Booking.builder()
                .user(user)
                .event(event)
                .numberOfTickets(request.getNumberOfTickets())
                .totalAmount(totalAmount)
                .bookingStatus("CONFIRMED")
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        return BookingResponse.builder()
                .bookingId(savedBooking.getId())
                .userName(user.getFullName())
                .eventName(event.getEventName())
                .numberOfTickets(savedBooking.getNumberOfTickets())
                .totalAmount(savedBooking.getTotalAmount())
                .bookingStatus(savedBooking.getBookingStatus())
                .build();
    }

    // Get All Bookings
    public List<BookingResponse> getAllBookings() {

        return bookingRepository.findAll()
                .stream()
                .map(booking -> BookingResponse.builder()
                        .bookingId(booking.getId())
                        .userName(booking.getUser().getFullName())
                        .eventName(booking.getEvent().getEventName())
                        .numberOfTickets(booking.getNumberOfTickets())
                        .totalAmount(booking.getTotalAmount())
                        .bookingStatus(booking.getBookingStatus())
                        .build())
                .toList();
    }

    // Get Bookings By User
    public List<BookingResponse> getBookingsByUserId(Long userId) {

        return bookingRepository.findByUserId(userId)
                .stream()
                .map(booking -> BookingResponse.builder()
                        .bookingId(booking.getId())
                        .userName(booking.getUser().getFullName())
                        .eventName(booking.getEvent().getEventName())
                        .numberOfTickets(booking.getNumberOfTickets())
                        .totalAmount(booking.getTotalAmount())
                        .bookingStatus(booking.getBookingStatus())
                        .build())
                .toList();
    }

    // Get Booking By Id
    public BookingResponse getBookingById(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking Not Found"));

        return BookingResponse.builder()
                .bookingId(booking.getId())
                .userName(booking.getUser().getFullName())
                .eventName(booking.getEvent().getEventName())
                .numberOfTickets(booking.getNumberOfTickets())
                .totalAmount(booking.getTotalAmount())
                .bookingStatus(booking.getBookingStatus())
                .build();
    }

    // Cancel Booking
    public String cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking Not Found"));

        Event event = booking.getEvent();

        // Seats Restore
        event.setAvailableSeats(
                event.getAvailableSeats() + booking.getNumberOfTickets()
        );

        eventRepository.save(event);

        bookingRepository.delete(booking);

        return "Booking Cancelled Successfully";
    }
}