package br.com.jpgdev.jogos.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {
    // O Spring Security usará este método para buscar um utilizador pelo nome de utilizador
    UserDetails findByUsername(String username);
}