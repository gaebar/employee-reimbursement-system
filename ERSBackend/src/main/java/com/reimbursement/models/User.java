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

    @Column(nullable = false, columnDefinition = "VARCHAR(255) default 'employee'")
    private String role; // Default role is 'employee'

    @Column(nullable = false, length = 255, columnDefinition="VARCHAR(255) default 'Unknown'")
    private String firstName;

    @Column(nullable = false, length = 255, columnDefinition="VARCHAR(255) default 'User'")
    private String lastName;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ReimbursementRequest> reimbursementRequests;

    public User() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<ReimbursementRequest> getReimbursementRequests() {
        return reimbursementRequests;
    }

    public void setReimbursementRequests(List<ReimbursementRequest> reimbursementRequests) {
        this.reimbursementRequests = reimbursementRequests;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", reimbursementRequests=" + reimbursementRequests +
                '}';
    }
}
