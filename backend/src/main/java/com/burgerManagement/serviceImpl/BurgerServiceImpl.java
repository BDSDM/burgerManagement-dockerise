package com.burgerManagement.serviceImpl;

import com.burgerManagement.dao.BurgerDao;
import com.burgerManagement.pojo.Burger;
import com.burgerManagement.service.BurgerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BurgerServiceImpl implements BurgerService {

    @Autowired
    private BurgerDao burgerDao;

    @Override
    public Burger saveBurger(Burger burger) {
        return burgerDao.save(burger);
    }

    @Override
    public Burger updateBurger(Long id, Burger burger) {
        Optional<Burger> existing = burgerDao.findById(id);
        if (existing.isPresent()) {
            Burger b = existing.get();
            b.setName(burger.getName());
            b.setPrice(burger.getPrice());
            b.setImage(burger.getImage());
            b.setUser(burger.getUser());
            return burgerDao.save(b);
        }
        return null; // ou lever exception
    }

    @Override
    public void deleteBurger(Long id) {
        burgerDao.deleteById(id);
    }

    @Override
    public Burger getBurgerById(Long id) {
        return burgerDao.findById(id).orElse(null);
    }

    @Override
    public List<Burger> getAllBurgers() {
        return burgerDao.findAll();
    }

    @Override
    public List<Burger> getBurgersByUserId(Long userId) {
        return burgerDao.findByUserId(userId);
    }
}
