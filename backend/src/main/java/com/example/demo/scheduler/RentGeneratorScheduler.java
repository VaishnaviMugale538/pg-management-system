package com.example.demo.scheduler;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Payment;
import com.example.demo.entity.Tenant;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.TenantRepository;

@Component
public class RentGeneratorScheduler {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    // Runs once a month
    @Scheduled(cron = "0 0 1 1 * ?")
    public void generateMonthlyRent() {

        List<Tenant> tenants = tenantRepository.findAll();

        for (Tenant tenant : tenants) {

            if (!"ACTIVE".equals(tenant.getStatus())) continue;

            Payment payment = new Payment();

            payment.setTenantId(tenant.getTenantId());
            payment.setAmount(tenant.getRent());
            payment.setMonth(Month.from(LocalDate.now()).name());
            payment.setStatus("PENDING");
            payment.setPaymentDate(LocalDate.now());

            paymentRepository.save(payment);
        }
    }
}