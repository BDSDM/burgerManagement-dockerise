package com.burgerManagement.restImpl;

import com.burgerManagement.pojo.Menu;
import com.burgerManagement.pojo.User;
import com.burgerManagement.service.MenuService;
import com.burgerManagement.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
public class MenuRestImpl {

    @Autowired
    private MenuService menuService;

    @Autowired
    private UserDao userDao;

    // -------------------- Création --------------------
    @PostMapping
    public Menu createMenu(@RequestBody Menu menuDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userDao.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Menu menu = new Menu();
        menu.setBurger(menuDto.getBurger());
        menu.setDrink(menuDto.getDrink());
        menu.setDessert(menuDto.getDessert());
        menu.setUser(user);

        return menuService.saveMenu(menu);
    }

    // -------------------- Mise à jour --------------------
    @PutMapping("/{id}")
    public Menu updateMenu(@PathVariable("id") Long id, @RequestBody Menu menuDto) {
        return menuService.updateMenu(id, menuDto);
    }

    // -------------------- Suppression --------------------
    @DeleteMapping("/{id}")
    public void deleteMenu(@PathVariable("id") Long id) {
        menuService.deleteMenu(id);
    }

    // -------------------- Récupérer un menu --------------------
    @GetMapping("/{id}")
    public Menu getMenu(@PathVariable("id") Long id) {
        return menuService.getMenuById(id);
    }

    // -------------------- Récupérer tous les menus --------------------
    @GetMapping
    public List<Menu> getAllMenus() {
        return menuService.getAllMenus();
    }

    // -------------------- Récupérer menus par utilisateur --------------------
    @GetMapping("/user/{userId}")
    public List<Menu> getMenusByUser(@PathVariable("userId") Long userId) {
        return menuService.getMenusByUserId(userId);
    }
}
