package com.burgerManagement.dao;

import com.burgerManagement.pojo.Burger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BurgerDao extends JpaRepository<Burger, Long> {

    List<Burger> findByUserId(Long userId);
}
