package br.com.jpgdev.jogos.games;

import br.com.jpgdev.jogos.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    
    @Column(nullable = false)
    private String nome;
    
    private Integer nota;
    private String imagem;
    private String avaliacao;
    private LocalDateTime dataAdicao;
    private LocalDateTime dataFinalizacao;
    private Integer horasJogadas;

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GamesStatus status;

    public Games(GamesRequestDTO data) {
        this.nome = data.nome();
        this.nota = data.nota();
        this.imagem = data.imagem();
        this.avaliacao = data.avaliacao();
        this.status = data.status();
        this.horasJogadas = data.horasJogadas();
        this.dataAdicao = LocalDateTime.now();
        
        if (data.status() == GamesStatus.JOGADO) {
            this.dataFinalizacao = LocalDateTime.now();
        }
    }

    public Games(GamesRequestDTO data, User user) {
        this(data);
        this.user = user;
    }

    public void atualizaJogo(GamesRequestDTO dados) {
        this.nome = dados.nome();
        this.nota = dados.nota();
        this.imagem = dados.imagem();
        this.avaliacao = dados.avaliacao();
        this.horasJogadas = dados.horasJogadas();
        
        atualizaStatusEDataDeFinalizacao(dados.status());
    }

    private void atualizaStatusEDataDeFinalizacao(GamesStatus newStatus) {
        boolean foiCompletado = this.status == GamesStatus.JOGADO;
        boolean agoraEstaCompletado = newStatus == GamesStatus.JOGADO;
        
        if (agoraEstaCompletado && !foiCompletado) {
            this.dataFinalizacao = LocalDateTime.now();
        } else if (!agoraEstaCompletado && foiCompletado) {
            this.dataFinalizacao = null;
        }
        
        this.status = newStatus;
    }
}

