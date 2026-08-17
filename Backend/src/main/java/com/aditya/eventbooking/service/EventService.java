package com.aditya.eventbooking.service;

import com.aditya.eventbooking.dto.EventRequest;
import com.aditya.eventbooking.dto.EventResponse;
import com.aditya.eventbooking.entity.Event;
import com.aditya.eventbooking.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // Add Event
    public EventResponse addEvent(EventRequest request) {

        Event event = Event.builder()
                .eventName(request.getEventName())
                .category(request.getCategory())
                .venue(request.getVenue())
                .eventDate(request.getEventDate())
                .eventTime(request.getEventTime())
                .ticketPrice(request.getTicketPrice())
                .totalSeats(request.getTotalSeats())
                .availableSeats(request.getTotalSeats())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .build();

        Event savedEvent = eventRepository.save(event);

        return mapToResponse(savedEvent);
    }

    // Get All Events
    public List<EventResponse> getAllEvents() {

        return eventRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get Event By Id
    public EventResponse getEventById(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event Not Found"));

        return mapToResponse(event);
    }

    // Update Event
    public EventResponse updateEvent(Long id, EventRequest request) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event Not Found"));

        event.setEventName(request.getEventName());
        event.setCategory(request.getCategory());
        event.setVenue(request.getVenue());
        event.setEventDate(request.getEventDate());
        event.setEventTime(request.getEventTime());
        event.setTicketPrice(request.getTicketPrice());
        event.setTotalSeats(request.getTotalSeats());
        event.setAvailableSeats(request.getTotalSeats());
        event.setDescription(request.getDescription());
        event.setImageUrl(request.getImageUrl());

        Event updatedEvent = eventRepository.save(event);

        return mapToResponse(updatedEvent);
    }

    // Delete Event
    public String deleteEvent(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event Not Found"));

        eventRepository.delete(event);

        return "Event Deleted Successfully";
    }

    // Common Mapper
    private EventResponse mapToResponse(Event event) {

        return EventResponse.builder()
                .id(event.getId())
                .eventName(event.getEventName())
                .category(event.getCategory())
                .venue(event.getVenue())
                .eventDate(event.getEventDate())
                .eventTime(event.getEventTime())
                .ticketPrice(event.getTicketPrice())
                .totalSeats(event.getTotalSeats())
                .availableSeats(event.getAvailableSeats())
                .description(event.getDescription())
                .imageUrl(event.getImageUrl())
                .build();
    }
}