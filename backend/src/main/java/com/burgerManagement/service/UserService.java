package com.burgerManagement.service;



import com.burgerManagement.dto.UserDTO;
import com.burgerManagement.pojo.User;

import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    User getUserById(Long id);
    User saveUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
}
