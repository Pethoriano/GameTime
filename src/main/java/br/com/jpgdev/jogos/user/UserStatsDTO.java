package br.com.jpgdev.jogos.user;

public record UserStatsDTO(
    Long totalJogos,
    Long jogosZerados,
    Long jogosJogando,
    Long jogosBacklog,
    Integer totalHorasJogadas,
    Double mediaNotas
) {
}

