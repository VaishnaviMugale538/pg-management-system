package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.demo.dto.RentReminderDTO;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Tenant;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.TenantRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private TenantRepository tenantRepository;

    // Save payment
    public Payment savePayment(Payment payment) {

    	payment.setStatus("PENDING");
        payment.setPaymentDate(null);
        
        return paymentRepository.save(payment);
    }

    // Get all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Payments by tenant
    public List<Payment> getPaymentsByTenant(Long id) {
        return paymentRepository.findByTenantId(id);
    }

    // Payments by month
    public List<Payment> getPaymentsByMonth(String month) {
        return paymentRepository.findByMonth(month);
    }

    // Monthly revenue
    public Double getMonthlyRevenue(int month) {
        Double revenue = paymentRepository.getMonthlyRevenue(month);
        return revenue == null ? 0.0 : revenue;
    }

    // Pending payments
    public List<Payment> getPendingPayments() {
        return paymentRepository.getPendingPayments();
    }

    // Mark rent paid
    public Payment markPaymentPaid(Long id) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setStatus("PAID");
        payment.setPaymentDate(LocalDate.now());

        return paymentRepository.save(payment);
    }

    // Overdue payments
    public List<Payment> getOverduePayments() {
        return paymentRepository.findOverduePayments(LocalDate.now());
    }

    // Rent reminders
    public List<RentReminderDTO> getRentReminders() {
        return paymentRepository.getRentReminders();
    }

    // AUTO MONTHLY RENT GENERATOR
    // Runs at 1 AM on the 1st day of every month
    @Scheduled(cron = "0 0 1 1 * ?")
    public void generateMonthlyRent() {

        List<Tenant> tenants = tenantRepository.findAll();

        String currentMonth = LocalDate.now().getMonth().toString();

        for (Tenant tenant : tenants) {

            if (!"ACTIVE".equalsIgnoreCase(tenant.getStatus())) {
                continue;
            }

            // Prevent duplicate rent generation
            boolean exists = paymentRepository
                    .existsByTenantIdAndMonth(tenant.getTenantId(), currentMonth);

            if (exists) {
                continue;
            }

            Payment payment = new Payment();

            payment.setTenantId(tenant.getTenantId());
            payment.setAmount(tenant.getRent());
            payment.setMonth(currentMonth);
            payment.setStatus("PENDING");

            paymentRepository.save(payment);
        }
    }

    // Delete payment
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}