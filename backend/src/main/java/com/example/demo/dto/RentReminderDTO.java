package com.example.demo.dto;

public class RentReminderDTO {

    private String tenantName;
    private String roomNumber;
    private double amount;
    private String status;

    public RentReminderDTO(String tenantName, String roomNumber, double amount, String status) {
        this.tenantName = tenantName;
        this.roomNumber = roomNumber;
        this.amount = amount;
        this.status = status;
    }

    public String getTenantName() {
        return tenantName;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public double getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }
}