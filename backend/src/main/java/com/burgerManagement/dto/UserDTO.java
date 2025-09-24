package com.burgerManagement.dto;

import java.util.List;

public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String role;
    private List<Long> burgerIds; // Optionnel : IDs des burgers liés à l'utilisateur

    public UserDTO() {}

    // Constructeur avec tous les champs
    public UserDTO(Long id, String name, String email, String role, List<Long> burgerIds) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.burgerIds = burgerIds;
    }

    // Constructeur sans les burgers
    public UserDTO(Long id, String name, String email, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public List<Long> getBurgerIds() { return burgerIds; }
    public void setBurgerIds(List<Long> burgerIds) { this.burgerIds = burgerIds; }
}
