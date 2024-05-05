package com.reimbursement.services;

import com.reimbursement.DAOs.ReimbursementDAO;
import com.reimbursement.models.ReimbursementRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReimbursementService {

    @Autowired
    private ReimbursementDAO reimbursementDAO;

    public List<ReimbursementRequest> findAll() {
        return reimbursementDAO.findAll();
    }

    public ReimbursementRequest createReimbursement(ReimbursementRequest request) {
        return reimbursementDAO.save(request);
    }

    public ReimbursementRequest approveReimbursement(int id) {
        ReimbursementRequest request = reimbursementDAO.findById(id).orElseThrow();
        request.setStatus("Approved");
        return reimbursementDAO.save(request);
    }

    public ReimbursementRequest denyReimbursement(int id) {
        ReimbursementRequest request = reimbursementDAO.findById(id).orElseThrow();
        request.setStatus("Denied");
        return reimbursementDAO.save(request);
    }
}


