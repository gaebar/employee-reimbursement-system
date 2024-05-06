package com.reimbursement.services;

import com.reimbursement.DAOs.ReimbursementDAO;
import com.reimbursement.models.ReimbursementRequest;
import com.reimbursement.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static java.lang.System.currentTimeMillis;

@Service
public class ReimbursementService {

    @Autowired
    private ReimbursementDAO reimbursementDAO;

    public List<ReimbursementRequest> findAll() {
        return reimbursementDAO.findAll();
    }

    @Transactional
    public ReimbursementRequest createReimbursement(ReimbursementRequest request, String userId) {
        try {
            User user = new User();
            user.setUserId(Integer.parseInt(userId));
            request.setDateSubmitted(LocalDate.now());
            request.setStatus(ReimbursementRequest.ReinbursementStatus.PENDING);
            request.setUser(user);
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
            request.setStatus(ReimbursementRequest.ReinbursementStatus.APPROVED);
            return reimbursementDAO.save(request);
        } else {
            throw new RuntimeException("Reimbursement request not found");
        }
    }

    public ReimbursementRequest denyReimbursement(int id) {
        Optional<ReimbursementRequest> found = reimbursementDAO.findById(id);
        if (found.isPresent()) {
            ReimbursementRequest request = found.get();
            request.setStatus(ReimbursementRequest.ReinbursementStatus.DENIED);
            return reimbursementDAO.save(request);
        } else {
            throw new RuntimeException("Reimbursement request not found");
        }
    }

    public List<ReimbursementRequest> findByUserId(int userId) {
        return reimbursementDAO.findByUserUserId(userId);
    }
}
