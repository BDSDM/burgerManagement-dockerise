package com.burgerManagement.pojo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "menus")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String burger;
    private String drink;   // Peut être null
    private String dessert; // Peut être null

    // Relation ManyToOne vers User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference  // Évite boucle JSON
    private User user;

    public Menu() {}

    public Menu(String burger, String drink, String dessert, User user) {
        this.burger = burger;
        this.drink = drink;
        this.dessert = dessert;
        this.user = user;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBurger() { return burger; }
    public void setBurger(String burger) { this.burger = burger; }

    public String getDrink() { return drink; }
    public void setDrink(String drink) { this.drink = drink; }

    public String getDessert() { return dessert; }
    public void setDessert(String dessert) { this.dessert = dessert; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
