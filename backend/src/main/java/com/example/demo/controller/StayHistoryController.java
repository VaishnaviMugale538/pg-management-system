package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.StayHistory;
import com.example.demo.repository.StayHistoryRepository;

@RestController
@RequestMapping("/history")
@CrossOrigin
public class StayHistoryController {

    @Autowired
    private StayHistoryRepository stayHistoryRepository;

    @GetMapping("/tenant/{tenantId}")
    public List<StayHistory> getTenantHistory(@PathVariable Long tenantId) {
        return stayHistoryRepository.findByTenantId(tenantId);
    }

    @GetMapping
    public List<StayHistory> getAllHistory() {
        return stayHistoryRepository.findAll();
    }
}