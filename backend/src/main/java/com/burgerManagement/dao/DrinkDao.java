package com.burgerManagement.dao;

import com.burgerManagement.pojo.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrinkDao extends JpaRepository<Drink, Long> {

    // Récupérer tous les drinks d'un utilisateur
    List<Drink> findByUserId(Long userId);
}
