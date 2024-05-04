package com.reimbursement.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId; // This field has been renamed from 'id' to 'userId'.

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password; // Optional in some contexts, handle with care

    @Column(nullable = false)
    private String role; // This field is labeled as 'Optional' in comment, but the column is not nullable. Consider adjusting based on actual requirements.

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ReimbursementRequest> reimbursementRequests;

    public User() {
    }

    public int getUserId() { // Renamed from 'getId' to 'getUserId' to match the field name.
        return userId;
    }

    public void setUserId(int userId) { // Renamed from 'setId' to 'setUserId' to match the field name.
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<ReimbursementRequest> getReimbursementRequests() {
        return reimbursementRequests;
    }

    public void setReimbursementRequests(List<ReimbursementRequest> reimbursementRequests) {
        this.reimbursementRequests = reimbursementRequests;
    }
}
