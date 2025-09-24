package com.burgerManagement.dao;

import com.burgerManagement.pojo.Dessert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DessertDao extends JpaRepository<Dessert, Long> {
    List<Dessert> findByUserId(Long userId);
}
