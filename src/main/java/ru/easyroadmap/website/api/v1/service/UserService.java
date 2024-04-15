package ru.easyroadmap.website.api.v1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.easyroadmap.website.storage.model.User;
import ru.easyroadmap.website.storage.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public final class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findById(email);
    }

    public boolean isUserPassword(String email, String password) {
        String hashedPassword = passwordEncoder.encode(password);
        Optional<User> user = userRepository.findById(email);
        return user.isPresent() && hashedPassword.equals(user.get().getPassword());
    }

}
