package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Tenant;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {

    List<Tenant> findByRoomId(Long roomId);

    List<Tenant> findByStatus(String status);

    Tenant findFirstByEmail(String email);

}