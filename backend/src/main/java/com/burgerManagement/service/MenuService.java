package com.burgerManagement.service;

import com.burgerManagement.pojo.Menu;
import java.util.List;

public interface MenuService {
    Menu saveMenu(Menu menu);
    void deleteMenu(Long id);
    Menu getMenuById(Long id);
    List<Menu> getAllMenus();
    List<Menu> getMenusByUserId(Long userId);

    // 🔹 Ajout pour mise à jour
    Menu updateMenu(Long id, Menu menu);
}
