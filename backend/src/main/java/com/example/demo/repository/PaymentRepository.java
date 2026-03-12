package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.RentReminderDTO;
import com.example.demo.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Find payments by tenant
    List<Payment> findByTenantId(Long tenantId);

    // Find payments by month
    List<Payment> findByMonth(String month);

    // Find payments by status
    List<Payment> findByStatus(String status);

    // Prevent duplicate monthly rent generation
    boolean existsByTenantIdAndMonth(Long tenantId, String month);

    // Total revenue
    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p")
    Double getTotalRevenue();

    // Monthly revenue
    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE MONTH(p.paymentDate)=:month")
    Double getMonthlyRevenue(@Param("month") int month);

    // Pending payments
    @Query("SELECT p FROM Payment p WHERE p.status = 'PENDING'")
    List<Payment> getPendingPayments();

    // Overdue payments
    @Query("""
        SELECT p FROM Payment p 
        WHERE p.status = 'PENDING' 
        AND p.paymentDate < :today
    """)
    List<Payment> findOverduePayments(@Param("today") LocalDate today);

    // Rent reminders
    @Query("""
    	    SELECT new com.example.demo.dto.RentReminderDTO(
    	        t.name,
    	        r.roomNumber,
    	        p.amount,
    	        CASE 
    	            WHEN p.paymentDate IS NULL THEN 'PENDING'
    	            WHEN p.paymentDate < CURRENT_DATE THEN 'OVERDUE'
    	            ELSE 'PAID'
    	        END
    	    )
    	    FROM Payment p
    	    JOIN Tenant t ON p.tenantId = t.tenantId
    	    JOIN Room r ON t.roomId = r.roomId
    	    WHERE p.status = 'PENDING'
    	""")
    	List<RentReminderDTO> getRentReminders();

}