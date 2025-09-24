package com.burgerManagement.restImpl;

import com.burgerManagement.pojo.Dessert;
import com.burgerManagement.pojo.User;
import com.burgerManagement.service.DessertService;
import com.burgerManagement.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/desserts")
public class DessertRestImpl {

    @Autowired
    private DessertService dessertService;

    @Autowired
    private UserDao userDao;

    // -------------------- Création --------------------
    @PostMapping
    public Dessert createDessert(@RequestBody Dessert dessertDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userDao.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Dessert dessert = new Dessert();
        dessert.setName(dessertDto.getName());
        dessert.setPrice(dessertDto.getPrice());
        dessert.setImage(dessertDto.getImage());
        dessert.setUser(user);

        return dessertService.saveDessert(dessert);
    }

    // -------------------- Mise à jour --------------------
    @PutMapping("/{id}")
    public Dessert updateDessert(@PathVariable("id") Long id, @RequestBody Dessert dessertDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userDao.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Dessert dessert = dessertService.getDessertById(id);
        dessert.setName(dessertDto.getName());
        dessert.setPrice(dessertDto.getPrice());
        dessert.setImage(dessertDto.getImage());
        dessert.setUser(user);

        return dessertService.updateDessert(id, dessert);
    }

    // -------------------- Suppression --------------------
    @DeleteMapping("/{id}")
    public void deleteDessert(@PathVariable("id") Long id) {
        dessertService.deleteDessert(id);
    }

    // -------------------- Récupérer un dessert --------------------
    @GetMapping("/{id}")
    public Dessert getDessert(@PathVariable Long id) {
        return dessertService.getDessertById(id);
    }

    // -------------------- Récupérer tous les desserts --------------------
    @GetMapping
    public List<Dessert> getAllDesserts() {
        return dessertService.getAllDesserts();
    }

    // -------------------- Récupérer desserts par utilisateur --------------------
    @GetMapping("/user/{userId}")
    public List<Dessert> getDessertsByUser(@PathVariable Long userId) {
        return dessertService.getDessertsByUserId(userId);
    }
}
