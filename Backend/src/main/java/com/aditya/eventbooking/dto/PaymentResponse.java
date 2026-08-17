package com.aditya.eventbooking.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {

    private String orderId;

    private Integer amount;

    private String currency;

    private String key;

}