package com.reimbursement.services;

import com.reimbursement.DAOs.ReimbursementDAO;
import com.reimbursement.models.ReimbursementRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    @Autowired
    private ReimbursementDAO reimbursementDAO;

    public List<ReimbursementRequest> findAll() {
        return reimbursementDAO.findAll();
    }

    @Transactional
    public ReimbursementRequest createReimbursement(ReimbursementRequest request) {
        try {
            return reimbursementDAO.save(request);
        } catch (Exception e) {
            System.out.println("Error creating reimbursement: " + e.getMessage());
            throw e; // rethrow the exception
        }
    }

    public ReimbursementRequest approveReimbursement(int id) {
        Optional<ReimbursementRequest> found = reimbursementDAO.findById(id);
        if (found.isPresent()) {
            ReimbursementRequest request = found.get();
            request.setStatus("Approved");
            return reimbursementDAO.save(request);
        } else {
            throw new RuntimeException("Reimbursement request not found");
        }
    }

    public ReimbursementRequest denyReimbursement(int id) {
        Optional<ReimbursementRequest> found = reimbursementDAO.findById(id);
        if (found.isPresent()) {
            ReimbursementRequest request = found.get();
            request.setStatus("Denied");
            return reimbursementDAO.save(request);
        } else {
            throw new RuntimeException("Reimbursement request not found");
        }
    }

    public List<ReimbursementRequest> findByUserId(int userId) {
        return reimbursementDAO.findByUserUserId(userId);
    }
}
