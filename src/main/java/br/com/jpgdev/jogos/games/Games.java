package br.com.jpgdev.jogos.games;

import br.com.jpgdev.jogos.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "games")
@Entity(name = "games")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Games {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Integer nota;
    private String imagem;
    private String avaliacao;

    // Adicione este campo à sua classe Games.java

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private GamesStatus status;

    public Games(GamesRequestDTO data) {
        this.nome = data.nome();
        this.nota = data.nota();
        this.imagem = data.imagem();
        this.avaliacao = data.avaliacao();
        this.status = data.status();
    }

    public void atualizaJogo(GamesRequestDTO dados) {
        this.nome = dados.nome();
        this.nota = dados.nota();
        this.imagem = dados.imagem();
        this.avaliacao = dados.avaliacao();
        this.status = dados.status();
    }
}
