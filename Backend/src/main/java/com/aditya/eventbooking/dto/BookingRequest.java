package com.aditya.eventbooking.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {

    private Long userId;

    private Long eventId;

    private Integer numberOfTickets;
}