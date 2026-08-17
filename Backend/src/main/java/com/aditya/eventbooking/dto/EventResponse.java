package com.aditya.eventbooking.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponse {

    private Long id;
    private String eventName;
    private String category;
    private String venue;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private Double ticketPrice;
    private Integer totalSeats;
    private Integer availableSeats;
    private String description;
    private String imageUrl;
}