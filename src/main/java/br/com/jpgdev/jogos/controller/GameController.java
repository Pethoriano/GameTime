package br.com.jpgdev.jogos.controller;

import br.com.jpgdev.jogos.games.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "http://localhost:4200") // Adicionado: Permite requisições do Angular
public class GameController {

    @Autowired
    private GamesRepository repository;

    // Método movido do HomeController para cá
    @GetMapping
public ResponseEntity<Page<GamesResponseDTO>> getAll(
        @PageableDefault(size = 8) Pageable pageable,
        @RequestParam(required = false) GamesStatus status,
        @RequestParam(required = false) String nome) { // 1. Adicionado o parâmetro 'nome'

    Page<Games> gamesPage; // 2. A variável agora é do tipo Page<Games>

    if (nome != null && !nome.isEmpty()) {
        // Se o parâmetro 'nome' for fornecido, busca por nome
        gamesPage = repository.findByNomeContainingIgnoreCase(nome, pageable);
    } else if (status != null) {
        // Senão, se o status for fornecido, busca por status
        gamesPage = repository.findByStatus(status, pageable);
    } else {
        // Senão, busca todos os jogos
        gamesPage = repository.findAll(pageable);
    }

    // 3. A conversão para DTO acontece aqui, de forma consistente para todos os casos
    Page<GamesResponseDTO> gamesDtoPage = gamesPage.map(GamesResponseDTO::new);

    return ResponseEntity.ok(gamesDtoPage);
}

    @GetMapping("/{id}")
    public ResponseEntity<GamesResponseDTO> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(game -> ResponseEntity.ok(new GamesResponseDTO(game)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<GamesResponseDTO> saveGame(@Valid @RequestBody GamesRequestDTO dados, UriComponentsBuilder uriBuilder) {
        Games game = new Games(dados);
        repository.save(game);
        var uri = uriBuilder.path("/api/games/{id}").buildAndExpand(game.getId()).toUri();
        return ResponseEntity.created(uri).body(new GamesResponseDTO(game));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<GamesResponseDTO> alteraGame(@PathVariable Long id, @Valid @RequestBody GamesRequestDTO dados) {
        return repository.findById(id)
                .map(game -> {
                    game.atualizaJogo(dados);
                    repository.save(game);
                    return ResponseEntity.ok(new GamesResponseDTO(game));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletaGame(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}