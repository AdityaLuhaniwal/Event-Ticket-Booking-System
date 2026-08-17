package com.aditya.eventbooking.controller;

import com.aditya.eventbooking.dto.EventRequest;
import com.aditya.eventbooking.dto.EventResponse;
import com.aditya.eventbooking.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    // Add Event
    @PostMapping
    public EventResponse addEvent(@RequestBody EventRequest request) {
        return eventService.addEvent(request);
    }

    // Get All Events
    @GetMapping
    public List<EventResponse> getAllEvents() {
        return eventService.getAllEvents();
    }

    // Get Event By Id
    @GetMapping("/{id}")
    public EventResponse getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // Update Event
    @PutMapping("/{id}")
    public EventResponse updateEvent(@PathVariable Long id,
                                     @RequestBody EventRequest request) {
        return eventService.updateEvent(id, request);
    }

    // Delete Event
    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id) {
        return eventService.deleteEvent(id);
    }
}