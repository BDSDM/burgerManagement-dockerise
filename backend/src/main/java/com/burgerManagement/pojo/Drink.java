package com.burgerManagement.pojo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "drinks")
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String image;

    // Relation ManyToOne vers User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference // Evite la boucle infinie JSON
    private User user;

    public Drink() {}

    public Drink(String name, Double price, String image, User user) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.user = user;
    }

    public Drink(Long id, String name, Double price, String image, User user) {
        this.id = id;
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

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
