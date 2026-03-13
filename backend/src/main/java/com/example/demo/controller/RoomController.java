package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.RoomDTO;
import com.example.demo.entity.Room;
import com.example.demo.service.RoomService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Add Room
    @PostMapping
    public Room addRoom(@RequestBody RoomDTO roomDTO) {

        Room room = new Room();

        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setCapacity(roomDTO.getCapacity());
        room.setRent(roomDTO.getRent());
        room.setStatus(roomDTO.getStatus());

        return roomService.saveRoom(room);
    }

    // Get all rooms
    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    // Get rooms with vacancy
    @GetMapping("/vacancy")
    public List<Room> getRoomsWithVacancy() {
        return roomService.getRoomsWithVacancy();
    }

    // Get available rooms
    @GetMapping("/available")
    public List<Room> getAvailableRooms() {
        return roomService.getAvailableRooms();
    }

    // Get vacant rooms
    @GetMapping("/vacant")
    public List<Room> getVacantRooms() {
        return roomService.getVacantRooms();
    }

    // Get room by ID
    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }

    // Delete room
    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }
}