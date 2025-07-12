package br.com.jpgdev.jogos.controller;

import br.com.jpgdev.jogos.games.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/cadastragame")
public class CadastraGameController {

    @Autowired
    private GamesRepository repository;

    @GetMapping
    public String getCadastraGame(Model model, Long id) {
        if (id!=null){
            Games games = repository.getReferenceById(id);
            GamesResponseDTO gamesResponseDTO = new GamesResponseDTO(games);
            model.addAttribute("games", gamesResponseDTO);
            return "alteragame";
        } else {
            model.addAttribute("games",new GamesResponseDTO(new Games()));
            return "cadastragame";
        }
    }

    @PostMapping
    @Transactional
    public String saveGame(@Valid GamesRequestDTO dados, BindingResult result, Model model) {
        if(result.hasErrors()){
            model.addAttribute("org.springframework.validation.BindingResult.games", result);
            return "cadastragame";
        }
        Games gamesdata = new Games(dados);
        repository.save(gamesdata);
        return "redirect:/";
    }

    @PutMapping
    @Transactional
    public String alteraGame(@Valid GamesRequestDTO dados, BindingResult result, Long id, Model model){
        if(result.hasErrors()){
            Games games = repository.getReferenceById(id);
            GamesResponseDTO gamesResponseDTO = new GamesResponseDTO(games);
            model.addAttribute("games", gamesResponseDTO);
            model.addAttribute("org.springframework.validation.BindingResult.games", result);
            return "alteragame";
        }
        Games game = repository.getReferenceById(id);
        game.atualizaJogo(dados);
        return "redirect:/";
    }
}
