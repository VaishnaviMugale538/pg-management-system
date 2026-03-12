package com.example.demo.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Room;
import com.example.demo.entity.StayHistory;
import com.example.demo.entity.Tenant;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.StayHistoryRepository;
import com.example.demo.repository.TenantRepository;

@Service
public class TenantService {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StayHistoryRepository stayHistoryRepository;


    // ✅ ADD TENANT
    public Tenant saveTenant(Tenant tenant) {

        Room room = roomRepository.findById(tenant.getRoomId()).orElse(null);

        if (room == null) {
            throw new RuntimeException("Room not found");
        }

        // Check if room full
        if (room.getOccupiedBeds() >= room.getCapacity()) {
            throw new RuntimeException("Room is full");
        }

        // Auto set rent
        tenant.setRent(room.getRent());

        // Increase occupied beds
        room.setOccupiedBeds(room.getOccupiedBeds() + 1);

        if (room.getOccupiedBeds() == room.getCapacity()) {
            room.setStatus("Occupied");
        }

        roomRepository.save(room);

        tenant.setStatus("ACTIVE");
        tenant.setCheckInDate(LocalDate.now().toString());

        return tenantRepository.save(tenant);
    }


    // ✅ GET ALL TENANTS
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }


    // ✅ GET TENANT BY ID
    public Tenant getTenantById(Long id) {
        return tenantRepository.findById(id).orElse(null);
    }


    // ✅ DELETE TENANT
    public void deleteTenant(Long id) {

        Tenant tenant = tenantRepository.findById(id).orElse(null);

        if (tenant != null) {

            Room room = roomRepository.findById(tenant.getRoomId()).orElse(null);

            if (room != null) {

                room.setOccupiedBeds(room.getOccupiedBeds() - 1);

                if (room.getOccupiedBeds() < room.getCapacity()) {
                    room.setStatus("Available");
                }

                roomRepository.save(room);
            }

            tenantRepository.deleteById(id);
        }
    }


    // ✅ CHECKOUT TENANT
    public Tenant checkoutTenant(Long id) {

        Tenant tenant = tenantRepository.findById(id).orElse(null);

        if (tenant == null) {
            throw new RuntimeException("Tenant not found");
        }

        LocalDate checkIn = LocalDate.parse(tenant.getCheckInDate());
        LocalDate checkOut = LocalDate.now();

        int duration = (int) ChronoUnit.DAYS.between(checkIn, checkOut);

        StayHistory history = new StayHistory();
        history.setTenantId(tenant.getTenantId());
        history.setRoomId(tenant.getRoomId());
        history.setCheckInDate(checkIn);
        history.setCheckOutDate(checkOut);
        history.setDurationDays(duration);

        stayHistoryRepository.save(history);

        tenant.setStatus("LEFT");
        tenant.setCheckOutDate(checkOut.toString());

        Room room = roomRepository.findById(tenant.getRoomId()).orElse(null);

        if (room != null) {

            room.setOccupiedBeds(room.getOccupiedBeds() - 1);

            if (room.getOccupiedBeds() < room.getCapacity()) {
                room.setStatus("Available");
            }

            roomRepository.save(room);
        }

        return tenantRepository.save(tenant);
    }


    // ✅ REFUND DEPOSIT
    public Tenant refundDeposit(Long id) {

        Tenant tenant = tenantRepository.findById(id).orElse(null);

        if (tenant == null) {
            throw new RuntimeException("Tenant not found");
        }

        tenant.setRefundStatus("REFUNDED");

        return tenantRepository.save(tenant);
    }
}