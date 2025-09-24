package com.burgerManagement.restImpl;

import com.burgerManagement.pojo.Burger;
import com.burgerManagement.pojo.User;
import com.burgerManagement.service.BurgerService;
import com.burgerManagement.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/burgers")
public class BurgerRestImpl {

    @Autowired
    private BurgerService burgerService;

    @Autowired
    private UserDao userDao;

    // -------------------- Création --------------------
    @PostMapping
    public Burger createBurger(@RequestBody Burger burgerDto) {
        // Récupérer l'utilisateur connecté
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userDao.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Crée une nouvelle instance pour éviter les problèmes avec @JsonBackReference
        Burger burger = new Burger();
        burger.setName(burgerDto.getName());
        burger.setPrice(burgerDto.getPrice());
        burger.setImage(burgerDto.getImage());
        burger.setUser(user); // Assigner l'utilisateur

        return burgerService.saveBurger(burger);
    }

    // -------------------- Mise à jour --------------------
    @PutMapping("/{id}")
    public Burger updateBurger(@PathVariable("id") Long id, @RequestBody Burger burgerDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userDao.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Burger burger = burgerService.getBurgerById(id);
        burger.setName(burgerDto.getName());
        burger.setPrice(burgerDto.getPrice());
        burger.setImage(burgerDto.getImage());
        burger.setUser(user);

        return burgerService.updateBurger(id, burger);
    }

    // -------------------- Suppression --------------------
    @DeleteMapping("/{id}")
    public void deleteBurger(@PathVariable("id") Long id) {
        burgerService.deleteBurger(id);
    }

    // -------------------- Récupérer un burger --------------------
    @GetMapping("/{id}")
    public Burger getBurger(@PathVariable Long id) {
        return burgerService.getBurgerById(id);
    }

    // -------------------- Récupérer tous les burgers --------------------
    @GetMapping
    public List<Burger> getAllBurgers() {
        return burgerService.getAllBurgers();
    }

    // -------------------- Récupérer burgers par utilisateur --------------------
    @GetMapping("/user/{userId}")
    public List<Burger> getBurgersByUser(@PathVariable Long userId) {
        return burgerService.getBurgersByUserId(userId);
    }
}
