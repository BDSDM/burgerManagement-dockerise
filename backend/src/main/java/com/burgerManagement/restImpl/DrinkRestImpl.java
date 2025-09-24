package com.burgerManagement.restImpl;

import com.burgerManagement.pojo.Drink;
import com.burgerManagement.pojo.User;
import com.burgerManagement.service.DrinkService;
import com.burgerManagement.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drinks")
public class DrinkRestImpl {

    @Autowired
    private DrinkService drinkService;

    @Autowired
    private UserDao userDao;

    // -------------------- Création --------------------
    @PostMapping
    public Drink createDrink(@RequestBody Drink drinkDto) {
        // Récupérer l'utilisateur connecté
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userDao.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Crée une nouvelle instance pour éviter les problèmes avec @JsonBackReference
        Drink drink = new Drink();
        drink.setName(drinkDto.getName());
        drink.setPrice(drinkDto.getPrice());
        drink.setImage(drinkDto.getImage());
        drink.setUser(user); // Assigner l'utilisateur connecté

        return drinkService.saveDrink(drink);
    }

    // -------------------- Mise à jour --------------------
    @PutMapping("/{id}")
    public Drink updateDrink(@PathVariable("id") Long id, @RequestBody Drink drinkDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userDao.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Drink drink = drinkService.getDrinkById(id);
        drink.setName(drinkDto.getName());
        drink.setPrice(drinkDto.getPrice());
        drink.setImage(drinkDto.getImage());
        drink.setUser(user);

        return drinkService.updateDrink(id, drink);
    }

    // -------------------- Suppression --------------------
    @DeleteMapping("/{id}")
    public void deleteDrink(@PathVariable("id") Long id) {
        drinkService.deleteDrink(id);
    }

    // -------------------- Récupérer un drink --------------------
    @GetMapping("/{id}")
    public Drink getDrink(@PathVariable Long id) {
        return drinkService.getDrinkById(id);
    }

    // -------------------- Récupérer tous les drinks --------------------
    @GetMapping
    public List<Drink> getAllDrinks() {
        return drinkService.getAllDrinks();
    }

    // -------------------- Récupérer drinks par utilisateur --------------------
    @GetMapping("/user/{userId}")
    public List<Drink> getDrinksByUser(@PathVariable Long userId) {
        return drinkService.getDrinksByUserId(userId);
    }
}
