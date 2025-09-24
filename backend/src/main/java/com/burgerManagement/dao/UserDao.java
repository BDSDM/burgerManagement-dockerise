package com.burgerManagement.dao;

import com.burgerManagement.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

    // Chercher un utilisateur par email
    Optional<User> findByEmail(String email);

    // Vérifier si un utilisateur existe par email
    boolean existsByEmail(String email);

    // Chercher tous les utilisateurs par rôle
    List<User> findByRole(String role);
}
