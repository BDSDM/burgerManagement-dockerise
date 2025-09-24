package com.burgerManagement.dao;

import com.burgerManagement.pojo.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuDao extends JpaRepository<Menu, Long> {
    List<Menu> findByUserId(Long userId);
}
