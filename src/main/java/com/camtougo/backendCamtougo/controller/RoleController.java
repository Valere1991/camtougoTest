package com.camtougo.backendCamtougo.controller;

import com.camtougo.backendCamtougo.model.Role;
import com.camtougo.backendCamtougo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/super-admin/register-role")
    public Role addRole(@RequestBody Role role) {
        return roleService.saveRole(role);
    }

    @GetMapping("/super-admin/roles")
    public List<Role> findAllRoles() {
        return roleService.getRoles();
    }

    @GetMapping("/super-admin/role/{id}")
    public Role findRoleById(@PathVariable Long id) {
        return roleService.getRoleById(id);
    }

}
