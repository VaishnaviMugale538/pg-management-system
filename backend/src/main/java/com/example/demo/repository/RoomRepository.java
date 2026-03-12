package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByStatus(String status);
    List<Room> findByOccupiedBedsLessThan(int capacity);
    Room findByRoomNumber(String roomNumber);
    @Query("SELECT r FROM Room r WHERE r.capacity > r.occupiedBeds")
    List<Room> findVacantRooms();
    
    @Query("SELECT COUNT(r) FROM Room r WHERE r.occupiedBeds < r.capacity")
    Long countVacantRooms();

    @Query("SELECT COUNT(r) FROM Room r WHERE r.occupiedBeds = r.capacity")
    Long countOccupiedRooms();
    @Query("SELECT r FROM Room r WHERE r.occupiedBeds < r.capacity")
    List<Room> findRoomsWithVacancy();

}