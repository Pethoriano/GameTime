package br.com.jpgdev.jogos.infra.security.controller;

import br.com.jpgdev.jogos.infra.security.TokenService;
import br.com.jpgdev.jogos.infra.security.dto.AuthenticationDTO;
import br.com.jpgdev.jogos.infra.security.dto.TokenJWTDTO;
import br.com.jpgdev.jogos.user.User;
import br.com.jpgdev.jogos.user.UserRole;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.jpgdev.jogos.infra.security.dto.RegisterDTO;
import br.com.jpgdev.jogos.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var authentication = manager.authenticate(authenticationToken);

        var tokenJWT = tokenService.generateToken((User) authentication.getPrincipal());

        return ResponseEntity.ok(new TokenJWTDTO(tokenJWT));
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
        if (this.userRepository.findByUsername(data.username()) != null) {
            return ResponseEntity.badRequest().body("Utilizador já existente.");
        }

        var encryptedPassword = passwordEncoder.encode(data.password());
        var newUser = new User(data.username(), encryptedPassword, UserRole.USER);
        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
}