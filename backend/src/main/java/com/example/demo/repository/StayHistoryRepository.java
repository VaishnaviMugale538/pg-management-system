package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.StayHistory;

public interface StayHistoryRepository extends JpaRepository<StayHistory, Long> {

    List<StayHistory> findByTenantId(Long tenantId);

}