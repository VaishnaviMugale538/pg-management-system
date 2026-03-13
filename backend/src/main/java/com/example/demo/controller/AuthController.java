package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Tenant;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.TenantRepository;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TenantRepository tenantRepository;

    public Map<String, Object> login(String username, String password) {

        Map<String, Object> response = new HashMap<>();

        // ADMIN LOGIN
        Admin admin = adminRepository.findByUsername(username);

        if (admin != null && admin.getPassword().equals(password)) {

            response.put("role", "ADMIN");
            response.put("userId", admin.getId());
            response.put("name", admin.getUsername());

            return response;
        }

        // TENANT LOGIN
        Tenant tenant = tenantRepository.findFirstByEmail(username);

        if (tenant != null && tenant.getPassword().equals(password)) {

            response.put("role", "TENANT");
            response.put("userId", tenant.getTenantId());
            response.put("name", tenant.getName());

            return response;
        }

        throw new RuntimeException("Invalid credentials");
    }
}