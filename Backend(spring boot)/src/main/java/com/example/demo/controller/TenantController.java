package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.TenantDTO;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Tenant;
import com.example.demo.service.PaymentService;
import com.example.demo.service.TenantService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tenants")
public class TenantController {

    @Autowired
    private TenantService tenantService;

    @Autowired
    private PaymentService paymentService;

    // Add Tenant
    @PostMapping
    public Tenant addTenant(@RequestBody TenantDTO tenantDTO) {

        Tenant tenant = new Tenant();

        tenant.setName(tenantDTO.getName());
        tenant.setPhone(tenantDTO.getPhone());
        tenant.setEmail(tenantDTO.getEmail());
        tenant.setRoomId(tenantDTO.getRoomId());
        tenant.setRent(tenantDTO.getRent());

        tenant.setDepositAmount(tenantDTO.getDepositAmount());
        tenant.setDepositStatus(tenantDTO.getDepositStatus());
        tenant.setRefundStatus(tenantDTO.getRefundStatus());

        return tenantService.saveTenant(tenant);
    }

    // Get all tenants
    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantService.getAllTenants();
    }

    // Get tenant by ID (Tenant Profile)
    @GetMapping("/{id}")
    public Tenant getTenantById(@PathVariable Long id) {
        return tenantService.getTenantById(id);
    }

    // Get payment history of tenant
    @GetMapping("/{id}/payments")
    public List<Payment> getTenantPayments(@PathVariable Long id) {
        return paymentService.getPaymentsByTenant(id);
    }

    // Checkout tenant
    @PutMapping("/checkout/{id}")
    public Tenant checkoutTenant(@PathVariable Long id) {
        return tenantService.checkoutTenant(id);
    }

    // Refund deposit
    @PutMapping("/refund/{id}")
    public Tenant refundDeposit(@PathVariable Long id) {
        return tenantService.refundDeposit(id);
    }

    // Delete tenant
    @DeleteMapping("/{id}")
    public void deleteTenant(@PathVariable Long id) {
        tenantService.deleteTenant(id);
    }
}