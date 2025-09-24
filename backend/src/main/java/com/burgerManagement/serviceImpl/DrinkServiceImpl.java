package com.burgerManagement.serviceImpl;

import com.burgerManagement.dao.DrinkDao;
import com.burgerManagement.pojo.Drink;
import com.burgerManagement.service.DrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DrinkServiceImpl implements DrinkService {

    @Autowired
    private DrinkDao drinkDao;

    @Override
    public Drink saveDrink(Drink drink) {
        return drinkDao.save(drink);
    }

    @Override
    public Drink updateDrink(Long id, Drink drink) {
        Optional<Drink> existingDrink = drinkDao.findById(id);
        if (existingDrink.isPresent()) {
            Drink d = existingDrink.get();
            d.setName(drink.getName());
            d.setPrice(drink.getPrice());
            d.setImage(drink.getImage());
            d.setUser(drink.getUser());
            return drinkDao.save(d);
        }
        return null;
    }

    @Override
    public void deleteDrink(Long id) {
        drinkDao.deleteById(id);
    }

    @Override
    public Drink getDrinkById(Long id) {
        return drinkDao.findById(id).orElse(null);
    }

    @Override
    public List<Drink> getAllDrinks() {
        return drinkDao.findAll();
    }

    @Override
    public List<Drink> getDrinksByUserId(Long userId) {
        return drinkDao.findByUserId(userId);
    }
}
