package br.com.jpgdev.jogos.services;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class IgdbService {

    @Value("${igdb.client-id}")
    private String clientId;

    @Value("${igdb.client-secret}")
    private String clientSecret;

    private String accessToken;
    private final WebClient webClient;

    public IgdbService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.igdb.com/v4/").build();
    }

    public Mono<String> getAccessToken() {
        return WebClient.builder().baseUrl("https://id.twitch.tv/oauth2/").build()
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("token")
                        .queryParam("client_id", clientId)
                        .queryParam("client_secret", clientSecret)
                        .queryParam("grant_type", "client_credentials")
                        .build())
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(jsonNode -> jsonNode.get("access_token").asText())
                .doOnNext(token -> this.accessToken = token);
    }

    public Mono<JsonNode> searchGame(String gameName) {
        return getAccessToken().flatMap(token ->
                webClient.post()
                        .uri("games")
                        .header("Client-ID", clientId)
                        .header("Authorization", "Bearer " + token)
                        .bodyValue("search \"" + gameName + "\"; fields name, cover.url, screenshots.url; limit 1;")
                        .retrieve()
                        .bodyToMono(JsonNode.class)
        );
    }

    public Mono<JsonNode> getGameCover(long coverId) {
        return getAccessToken().flatMap(token ->
                webClient.post()
                        .uri("covers")
                        .header("Client-ID", clientId)
                        .header("Authorization", "Bearer " + token)
                        .bodyValue("fields url; where id = " + coverId + ";")
                        .retrieve()
                        .bodyToMono(JsonNode.class)
        );
    }

    public Mono<JsonNode> getGameScreenshots(long screenshotId) {
        return getAccessToken().flatMap(token ->
                webClient.post()
                        .uri("screenshots")
                        .header("Client-ID", clientId)
                        .header("Authorization", "Bearer " + token)
                        .bodyValue("fields url; where id = " + screenshotId + ";")
                        .retrieve()
                        .bodyToMono(JsonNode.class)
        );
    }
}


