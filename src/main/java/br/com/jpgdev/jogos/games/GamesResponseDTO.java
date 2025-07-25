package br.com.jpgdev.jogos.games;

import java.time.LocalDateTime;

public record GamesResponseDTO(Long id, String nome, Integer nota, String imagem, String avaliacao, 
                              GamesStatus status, LocalDateTime dataAdicao, LocalDateTime dataFinalizacao, 
                              Integer horasJogadas) {

    public GamesResponseDTO(Games games){
        this(games.getId(), games.getNome(), games.getNota(), games.getImagem(), games.getAvaliacao(), 
             games.getStatus(), games.getDataAdicao(), games.getDataFinalizacao(), games.getHorasJogadas());
    }


}

