package br.com.jpgdev.jogos.games;

import br.com.jpgdev.jogos.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface GamesRepository extends JpaRepository <Games, Long> {

    Page<Games> findByStatus(GamesStatus gamesStatus, Pageable pageable);
    Page<Games> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
    
    Page<Games> findByUser(User user, Pageable pageable);
    Page<Games> findByUserAndStatus(User user, GamesStatus gamesStatus, Pageable pageable);
    Page<Games> findByUserAndNomeContainingIgnoreCase(User user, String nome, Pageable pageable);
    Optional<Games> findByIdAndUser(Long id, User user);
    
    Long countByUser(User user);
    Long countByUserAndStatus(User user, GamesStatus status);
    
    @Query("SELECT SUM(g.horasJogadas) FROM games g WHERE g.user = :user")
    Integer sumHorasJogadasByUser(@Param("user") User user);
    
    @Query("SELECT AVG(g.nota) FROM games g WHERE g.user = :user")
    Double avgNotaByUser(@Param("user") User user);
}