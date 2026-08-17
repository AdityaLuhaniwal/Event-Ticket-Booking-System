package com.aditya.eventbooking.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {

    private Long bookingId;

    private String eventName;

    private String userName;

    private Integer numberOfTickets;

    private Double totalAmount;

    private String bookingStatus;
}