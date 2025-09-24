package com.burgerManagement.pojo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "burger")
public class Burger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private String image;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference  // Evite la boucle infinie JSON
    private User user;

    public Burger() {}

    public Burger(String name, double price, String image, User user) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.user = user;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
