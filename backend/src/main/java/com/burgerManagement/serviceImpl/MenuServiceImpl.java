package com.burgerManagement.serviceImpl;

import com.burgerManagement.dao.MenuDao;
import com.burgerManagement.pojo.Menu;
import com.burgerManagement.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuDao menuDao;

    @Override
    public Menu saveMenu(Menu menu) {
        return menuDao.save(menu);
    }

    @Override
    public void deleteMenu(Long id) {
        menuDao.deleteById(id);
    }

    @Override
    public Menu getMenuById(Long id) {
        return menuDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu non trouvé"));
    }

    @Override
    public List<Menu> getAllMenus() {
        return menuDao.findAll();
    }

    @Override
    public List<Menu> getMenusByUserId(Long userId) {
        return menuDao.findByUserId(userId);
    }

    // 🔹 Implémentation de la mise à jour
    @Override
    public Menu updateMenu(Long id, Menu menuDetails) {
        Menu existingMenu = menuDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu non trouvé"));

        // Mise à jour uniquement des champs pertinents
        existingMenu.setBurger(menuDetails.getBurger());
        existingMenu.setDrink(menuDetails.getDrink());
        existingMenu.setDessert(menuDetails.getDessert());

        return menuDao.save(existingMenu);
    }
}
