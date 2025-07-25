package br.com.jpgdev.jogos.infra.security.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterDTO(@NotBlank String username, @NotBlank String password) {
}

