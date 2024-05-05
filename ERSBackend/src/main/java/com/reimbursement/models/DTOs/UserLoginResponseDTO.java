package com.reimbursement.models.DTOs;

public class UserLoginResponseDTO {

    private int userId;
    private String username;

    public UserLoginResponseDTO(int userId, String username) {
        this.userId = userId;
        this.username = username;
    }

    // Getter and Setter methods
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

    @Override
    public String toString() {
        return "UserLoginResponseDTO{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                '}';
    }
}
