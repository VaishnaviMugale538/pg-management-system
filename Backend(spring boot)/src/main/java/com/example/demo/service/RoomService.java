package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Room;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.RoomRepository;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    // Add room
    
    public Room saveRoom(Room room) {

        Room existing = roomRepository.findByRoomNumber(room.getRoomNumber());

        if(existing != null){
            throw new RuntimeException("Room already exists");
        }

        if(room.getOccupiedBeds() == null){
            room.setOccupiedBeds(0);
        }

        if(room.getStatus() == null){
            room.setStatus("Available");
        }

        return roomRepository.save(room);
    }
    
    // Get all rooms
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // Get available rooms
    public List<Room> getAvailableRooms() {
        return roomRepository.findByStatus("Available");
    }

    // Get room by ID
    public Room getRoomById(Long id) {
        return roomRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }

    // Get vacant rooms
    public List<Room> getVacantRooms() {
        return roomRepository.findVacantRooms();
    }
    public List<Room> getRoomsWithVacancy() {
        return roomRepository.findRoomsWithVacancy();
    }

    // Delete room
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}