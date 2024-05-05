package com.reimbursement.DAOs;

import com.reimbursement.models.ReimbursementRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReimbursementDAO extends JpaRepository<ReimbursementRequest, Integer> {
}
