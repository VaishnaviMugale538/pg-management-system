package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.RentReminderDTO;
import com.example.demo.entity.Payment;
import com.example.demo.service.PaymentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Add Payment
    @PostMapping
    public Payment savePayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    // Get All Payments
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // Get Payments By Tenant
    @GetMapping("/tenant/{id}")
    public List<Payment> getPaymentsByTenant(@PathVariable Long id) {
        return paymentService.getPaymentsByTenant(id);
    }

    // Get payments by month
    @GetMapping("/month/{month}")
    public List<Payment> getPaymentsByMonth(@PathVariable String month) {
        return paymentService.getPaymentsByMonth(month);
    }

    // Monthly revenue
    @GetMapping("/revenue/{month}")
    public Double getMonthlyRevenue(@PathVariable int month) {
        return paymentService.getMonthlyRevenue(month);
    }

    // Pending payments
    @GetMapping("/pending")
    public List<Payment> getPendingPayments() {
        return paymentService.getPendingPayments();
    }

    // Rent reminders (for dashboard table)
    @GetMapping("/rent-reminders")
    public List<RentReminderDTO> getRentReminders() {
        return paymentService.getRentReminders();
    }

    // Mark rent as paid
    
    @PutMapping("/pay/{id}")
    public Payment payRent(@PathVariable Long id) {
        return paymentService.markPaymentPaid(id);
    }

    // Overdue payments
    @GetMapping("/overdue")
    public List<Payment> getOverduePayments() {
        return paymentService.getOverduePayments();
    }

    // Delete Payment
    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }
}