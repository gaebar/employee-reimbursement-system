package com.reimbursement.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "reimbursement_requests")
public class ReimbursementRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reimbursement_id")
    private int reimbursementId;


    @Column(nullable = false)
    private double amount;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ReinbursementStatus status; // "pending", "approved", "denied"

    @Column(nullable = false)
    private LocalDate dateSubmitted;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private User user;

    public ReimbursementRequest() {
    }

    public int getReimbursementId() {
        return reimbursementId;
    }

    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ReinbursementStatus getStatus() {
        return status;
    }

    public void setStatus(ReinbursementStatus status) {
        this.status = status;
    }

    public LocalDate getDateSubmitted() {
        return dateSubmitted;
    }

    public void setDateSubmitted(LocalDate dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "ReimbursementRequest{" +
                "reimbursementId=" + reimbursementId +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", dateSubmitted=" + dateSubmitted +
                ", user=" + user +
                '}';
    }

    public enum ReinbursementStatus {
        PENDING, APPROVED, DENIED
    }
}
