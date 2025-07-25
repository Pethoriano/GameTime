package br.com.jpgdev.jogos.controller;

import br.com.jpgdev.jogos.games.GamesRepository;
import br.com.jpgdev.jogos.games.GamesStatus;
import br.com.jpgdev.jogos.user.User;
import br.com.jpgdev.jogos.user.UserStatsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:4200")
public class UserStatsController {

    private final GamesRepository gamesRepository;

    @Autowired
    public UserStatsController(GamesRepository gamesRepository) {
        this.gamesRepository = gamesRepository;
    }

    @GetMapping
    public ResponseEntity<UserStatsDTO> getUserStats(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        
        UserStatsDTO stats = calculateUserStats(user);
        return ResponseEntity.ok(stats);
    }

    private UserStatsDTO calculateUserStats(User user) {
        Long totalJogos = gamesRepository.countByUser(user);
        Long jogosZerados = gamesRepository.countByUserAndStatus(user, GamesStatus.JOGADO);
        Long jogosJogando = gamesRepository.countByUserAndStatus(user, GamesStatus.JOGANDO);
        Long jogosBacklog = gamesRepository.countByUserAndStatus(user, GamesStatus.BACKLOG);
        
        Integer totalHorasJogadas = gamesRepository.sumHorasJogadasByUser(user);
        totalHorasJogadas = totalHorasJogadas != null ? totalHorasJogadas : 0;
        
        Double mediaNotas = gamesRepository.avgNotaByUser(user);
        mediaNotas = mediaNotas != null ? mediaNotas : 0.0;
        
        return new UserStatsDTO(
            totalJogos,
            jogosZerados,
            jogosJogando,
            jogosBacklog,
            totalHorasJogadas,
            mediaNotas
        );
    }
}

