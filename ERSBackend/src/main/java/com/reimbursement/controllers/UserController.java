package com.reimbursement.controllers;

import com.reimbursement.models.DTOs.LoginUserDTO;
import com.reimbursement.models.DTOs.RegistrationUserDTO;
import com.reimbursement.models.DTOs.UserLoginResponseDTO;
import com.reimbursement.models.User;
import com.reimbursement.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody RegistrationUserDTO registerUserDTO){
        System.out.println("Attempting to register user: " + registerUserDTO);
        try{
            userService.registerUser(registerUserDTO);
            return ResponseEntity.status(201).body("User " + registerUserDTO.getUsername() + " was created successfully!");
        } catch (IllegalArgumentException e){
            System.out.println("Registration failed: " + e.getMessage());
            return ResponseEntity.status(400).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserDTO loginUserDTO, HttpSession session){
        System.out.println("Attempting to login with username: " + loginUserDTO.getUsername());
        Optional<User> optionalUser = userService.loginUser(loginUserDTO);

        if(optionalUser.isEmpty()){
            System.out.println("Login failed: No user found with provided credentials");
            return ResponseEntity.status(401).body("Login Failed!");
        }

        User u = optionalUser.get();
        System.out.println("Login successful for user: " + u.getUsername());

        session.setAttribute("userId", u.getUserId());
        session.setAttribute("username", u.getUsername());
        session.setAttribute("role", u.getRole());

        return ResponseEntity.ok(new UserLoginResponseDTO(u.getUserId(), u.getUsername(), u.getRole()));
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId){
        try{
            userService.deleteUser(userId);
            return ResponseEntity.ok("User " + userId + " was deleted successfully!");
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Failed to delete user: " + e.getMessage());
        }
    }
}
