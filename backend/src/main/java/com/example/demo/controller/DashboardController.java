package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Payment;
import com.example.demo.entity.Tenant;
import com.example.demo.entity.Room;
import com.example.demo.dto.RentReminderDTO;

import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.TenantRepository;
import com.example.demo.repository.PaymentRepository;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    // Dashboard Stats
    @GetMapping
    public Map<String, Object> getDashboardStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("tenants", tenantRepository.count());
        stats.put("rooms", roomRepository.count());
        stats.put("revenue", paymentRepository.getTotalRevenue());
        stats.put("pending", paymentRepository.getPendingPayments().size());
        stats.put("vacantRooms", roomRepository.findRoomsWithVacancy().size());
        stats.put("occupiedRooms", roomRepository.countOccupiedRooms());


        return stats;
    }

    // Monthly Revenue
    @GetMapping("/monthly-revenue")
    public Double getMonthlyRevenue(@RequestParam int month) {

        Double revenue = paymentRepository.getMonthlyRevenue(month);

        if (revenue == null) {
            revenue = 0.0;
        }

        return revenue;
    }

    // Rent Reminders
    @GetMapping("/rent-reminders")
    public List<RentReminderDTO> getPendingRentReminders() {

        List<Payment> payments = paymentRepository.getPendingPayments();
        List<RentReminderDTO> reminders = new ArrayList<>();

        for (Payment p : payments) {

            if (p.getTenantId() == null) continue;

            Tenant tenant = tenantRepository.findById(p.getTenantId()).orElse(null);
            if (tenant == null) continue;

            Room room = roomRepository.findById(tenant.getRoomId()).orElse(null);
            if (room == null) continue;

            RentReminderDTO dto = new RentReminderDTO(
                    tenant.getName(),
                    room.getRoomNumber(),
                    p.getAmount(),
                    p.getStatus()
            );

            reminders.add(dto);
        }

        return reminders;
    }

    // Room Occupancy
    @GetMapping("/room-status")
    public Map<String, Long> getRoomStatus() {

        Map<String, Long> data = new HashMap<>();

        data.put("vacantRooms", roomRepository.countVacantRooms());
        data.put("occupiedRooms", roomRepository.countOccupiedRooms());

        return data;
        
    }
    @GetMapping("/vacant-beds")
    public int getVacantBeds() {

        List<Room> rooms = roomRepository.findAll();

        int vacantBeds = 0;

        for(Room room : rooms){
            vacantBeds += (room.getCapacity() - room.getOccupiedBeds());
        }

        return vacantBeds;
    }
}