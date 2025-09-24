package com.burgerManagement.service;

import com.burgerManagement.pojo.Drink;

import java.util.List;

public interface DrinkService {

    Drink saveDrink(Drink drink);

    Drink updateDrink(Long id, Drink drink);

    void deleteDrink(Long id);

    Drink getDrinkById(Long id);

    List<Drink> getAllDrinks();

    List<Drink> getDrinksByUserId(Long userId);
}
