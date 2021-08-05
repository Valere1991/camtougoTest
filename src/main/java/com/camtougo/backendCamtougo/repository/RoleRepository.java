package com.camtougo.backendCamtougo.repository;

import com.camtougo.backendCamtougo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRoleName(String RoleName);

}
