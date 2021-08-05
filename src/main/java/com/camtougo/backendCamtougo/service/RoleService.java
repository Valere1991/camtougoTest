package com.camtougo.backendCamtougo.service;

import com.camtougo.backendCamtougo.exception.ResourceNotFoundException;
import com.camtougo.backendCamtougo.model.Role;
import com.camtougo.backendCamtougo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    // POST ROLE
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    // GET ROLE
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("No role with the id : " + id)
        );
    }
}
