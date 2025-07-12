package br.com.jpgdev.jogos.games;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GamesRepository extends JpaRepository <Games, Long> {

    // --- Método Modificado ---
    // Agora retorna Page<Games> para consistência. A conversão para DTO será no controller.
    Page<Games> findByStatus(GamesStatus gamesStatus, Pageable pageable);

    // --- Novo Método ---
    // Busca jogos cujo nome contenha o texto (ignorando maiúsculas/minúsculas).
    Page<Games> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}