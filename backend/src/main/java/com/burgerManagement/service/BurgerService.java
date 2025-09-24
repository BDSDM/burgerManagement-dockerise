package com.burgerManagement.service;

import com.burgerManagement.pojo.Burger;

import java.util.List;

public interface BurgerService {

    Burger saveBurger(Burger burger);

    Burger updateBurger(Long id, Burger burger);

    void deleteBurger(Long id);

    Burger getBurgerById(Long id);

    List<Burger> getAllBurgers();

    List<Burger> getBurgersByUserId(Long userId);
}
