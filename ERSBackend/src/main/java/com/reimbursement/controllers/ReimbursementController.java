package com.reimbursement.controllers;

import com.reimbursement.models.ReimbursementRequest;
import com.reimbursement.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reimbursements")
public class ReimbursementController {

    @Autowired
    private ReimbursementService reimbursementService;

    @GetMapping
    public ResponseEntity<?> getAllReimbursements() {
        try {
            return ResponseEntity.ok(reimbursementService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve reimbursements");
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getReimbursementsByUserId(@PathVariable int userId) {
        try {
            return ResponseEntity.ok(reimbursementService.findByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reimbursements for user with ID " + userId + " not found");
        }
    }

    @PostMapping
    public ResponseEntity<?> createReimbursement(@RequestBody ReimbursementRequest request) {
        try {
            return ResponseEntity.ok(reimbursementService.createReimbursement(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create reimbursement");
        }
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<?> approveReimbursement(@PathVariable int id) {
        try {
            return ResponseEntity.ok(reimbursementService.approveReimbursement(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to approve reimbursement");
        }
    }

    @PostMapping("/deny/{id}")
    public ResponseEntity<?> denyReimbursement(@PathVariable int id) {
        try {
            return ResponseEntity.ok(reimbursementService.denyReimbursement(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to deny reimbursement");
        }
    }
}
