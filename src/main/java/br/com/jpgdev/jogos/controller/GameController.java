package br.com.jpgdev.jogos.controller;

import br.com.jpgdev.jogos.games.*;
import reactor.core.publisher.Mono;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.security.core.Authentication;
import br.com.jpgdev.jogos.user.User;
import br.com.jpgdev.jogos.services.IgdbService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = {"http://localhost:4200"})
public class GameController {

    private final GamesRepository repository;
    private final IgdbService igdbService;

    @Autowired
    public GameController(GamesRepository repository, IgdbService igdbService) {
        this.repository = repository;
        this.igdbService = igdbService;
    }

    @GetMapping
    public ResponseEntity<Page<GamesResponseDTO>> getAllGames(
            @PageableDefault(size = 8) Pageable pageable,
            @RequestParam(required = false) GamesStatus status,
            @RequestParam(required = false) String nome,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        Page<Games> gamesPage = findGamesByFilters(user, nome, status, pageable);
        Page<GamesResponseDTO> gamesDtoPage = gamesPage.map(GamesResponseDTO::new);
        
        return ResponseEntity.ok(gamesDtoPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GamesResponseDTO> getGameById(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        
        return repository.findByIdAndUser(id, user)
                .map(game -> ResponseEntity.ok(new GamesResponseDTO(game)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Transactional
    public Mono<ResponseEntity<GamesResponseDTO>> createGame(@Valid @RequestBody GamesRequestDTO dados,
                                                      UriComponentsBuilder uriBuilder,
                                                      Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        return igdbService.searchGame(dados.nome())
                .flatMap(jsonNode -> {
                    String imageUrl = null;
                    if (jsonNode.isArray() && jsonNode.size() > 0) {
                        JsonNode gameNode = jsonNode.get(0);
                        if (gameNode.has("cover") && gameNode.get("cover").has("url")) {
                            imageUrl = gameNode.get("cover").get("url").asText();
                        } else if (gameNode.has("screenshots") && gameNode.get("screenshots").isArray() && gameNode.get("screenshots").size() > 0) {
                            imageUrl = gameNode.get("screenshots").get(0).get("url").asText();
                        }
                    }
                    Games game = new Games(dados, user);
                    game.setImagem(imageUrl != null ? imageUrl.replace("thumb", "cover_big") : null);
                    repository.save(game);

                    var uri = uriBuilder.path("/api/games/{id}").buildAndExpand(game.getId()).toUri();
                    return Mono.just(ResponseEntity.created(uri).body(new GamesResponseDTO(game)));
                })
                .switchIfEmpty(Mono.fromCallable(() -> {
                    Games game = new Games(dados, user);
                    repository.save(game);
                    var uri = uriBuilder.path("/api/games/{id}").buildAndExpand(game.getId()).toUri();
                    return ResponseEntity.created(uri).body(new GamesResponseDTO(game));
                }));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<GamesResponseDTO> updateGame(@PathVariable Long id, 
                                                      @Valid @RequestBody GamesRequestDTO dados,
                                                      Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        
        return repository.findByIdAndUser(id, user)
                .map(game -> {
                    game.atualizaJogo(dados);
                    repository.save(game);
                    return ResponseEntity.ok(new GamesResponseDTO(game));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteGame(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        
        return repository.findByIdAndUser(id, user)
                .map(game -> {
                    repository.delete(game);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private Page<Games> findGamesByFilters(User user, String nome, GamesStatus status, Pageable pageable) {
        if (nome != null && !nome.trim().isEmpty()) {
            return repository.findByUserAndNomeContainingIgnoreCase(user, nome.trim(), pageable);
        } else if (status != null) {
            return repository.findByUserAndStatus(user, status, pageable);
        } else {
            return repository.findByUser(user, pageable);
        }
    }
}

