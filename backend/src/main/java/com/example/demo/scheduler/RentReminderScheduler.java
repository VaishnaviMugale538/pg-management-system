package com.example.demo.scheduler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Payment;
import com.example.demo.repository.PaymentRepository;

@Component
public class RentReminderScheduler {

    @Autowired
    private PaymentRepository paymentRepository;

    // Runs every day at 9 AM
    @Scheduled(cron = "0 0 9 * * ?")
    public void sendRentReminders() {

        List<Payment> pendingPayments = paymentRepository.getPendingPayments();

        for (Payment payment : pendingPayments) {
            System.out.println("Reminder: Tenant " + payment.getTenantId() +
                    " has not paid rent. Amount: " + payment.getAmount());
        }
    }
}