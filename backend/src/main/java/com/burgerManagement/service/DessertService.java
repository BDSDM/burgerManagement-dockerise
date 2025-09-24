package com.burgerManagement.service;

import com.burgerManagement.pojo.Dessert;
import java.util.List;

public interface DessertService {
    Dessert saveDessert(Dessert dessert);
    Dessert updateDessert(Long id, Dessert dessert);
    void deleteDessert(Long id);
    Dessert getDessertById(Long id);
    List<Dessert> getAllDesserts();
    List<Dessert> getDessertsByUserId(Long userId);
}
