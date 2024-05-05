package com.reimbursement.controllers;

import com.reimbursement.models.ReimbursementRequest;
import com.reimbursement.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reimbursements")
public class ReimbursementController {

    @Autowired
    private ReimbursementService reimbursementService;

    @GetMapping
    public ResponseEntity<?> getAllReimbursements() {
        return ResponseEntity.ok(reimbursementService.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createReimbursement(@RequestBody ReimbursementRequest request) {
        return ResponseEntity.ok(reimbursementService.createReimbursement(request));
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<?> approveReimbursement(@PathVariable int id) {
        return ResponseEntity.ok(reimbursementService.approveReimbursement(id));
    }

    @PostMapping("/deny/{id}")
    public ResponseEntity<?> denyReimbursement(@PathVariable int id) {
        return ResponseEntity.ok(reimbursementService.denyReimbursement(id));
    }
}
