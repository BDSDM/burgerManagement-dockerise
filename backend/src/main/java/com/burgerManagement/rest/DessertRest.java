package com.burgerManagement.rest;

import com.burgerManagement.pojo.Dessert;
import java.util.List;

public interface DessertRest {

    // -------------------- Création --------------------
    Dessert createDessert(Dessert dessert);

    // -------------------- Mise à jour --------------------
    Dessert updateDessert(Long id, Dessert dessert);

    // -------------------- Suppression --------------------
    void deleteDessert(Long id);

    // -------------------- Récupérer un dessert --------------------
    Dessert getDessertById(Long id);

    // -------------------- Récupérer tous les desserts --------------------
    List<Dessert> getAllDesserts();

    // -------------------- Récupérer desserts par utilisateur --------------------
    List<Dessert> getDessertsByUserId(Long userId);
}
