package com.burgerManagement.serviceImpl;

import com.burgerManagement.dao.DessertDao;
import com.burgerManagement.pojo.Dessert;
import com.burgerManagement.service.DessertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DessertServiceImpl implements DessertService {

    @Autowired
    private DessertDao dessertDao;

    @Override
    public Dessert saveDessert(Dessert dessert) {
        return dessertDao.save(dessert);
    }

    @Override
    public Dessert updateDessert(Long id, Dessert dessert) {
        Dessert existingDessert = dessertDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Dessert non trouvé"));
        existingDessert.setName(dessert.getName());
        existingDessert.setPrice(dessert.getPrice());
        existingDessert.setImage(dessert.getImage());
        existingDessert.setUser(dessert.getUser());
        return dessertDao.save(existingDessert);
    }

    @Override
    public void deleteDessert(Long id) {
        dessertDao.deleteById(id);
    }

    @Override
    public Dessert getDessertById(Long id) {
        return dessertDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Dessert non trouvé"));
    }

    @Override
    public List<Dessert> getAllDesserts() {
        return dessertDao.findAll();
    }

    @Override
    public List<Dessert> getDessertsByUserId(Long userId) {
        return dessertDao.findByUserId(userId);
    }
}
