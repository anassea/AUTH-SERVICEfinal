package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class TwilioOTPService {

    @Autowired
    private UserRepository userRepository;

    private Map<String, String> otpMap = new HashMap<>();
    private Map<String, String> userOtpMap = new HashMap<>();
    private Map<String, String> userSessionMap = new HashMap<>();

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private String generateOTP() {
        return new DecimalFormat("000000").format(new Random().nextInt(999999));
    }

    public Mono<String> signUp(SignUpRequestDto signUpRequestDto) {
        String otp = generateOTP();
        otpMap.put(signUpRequestDto.getPhoneNumber(), otp);
        return Mono.just("Sign-up OTP: " + otp);
    }

    public Mono<String> validateOTPForSignUp(ValidateOtpRequestDto validateOtpRequestDto) {
        String storedOtp = otpMap.get(validateOtpRequestDto.getPhoneNumber());

        if (storedOtp != null && validateOtpRequestDto.getOtp().equals(storedOtp)) {
            otpMap.remove(validateOtpRequestDto.getPhoneNumber());

            if (userRepository.findByUserName(validateOtpRequestDto.getUserName()) == null) {
                User newUser = new User();
                newUser.setUserName(validateOtpRequestDto.getUserName());
                newUser.setPhoneNumber(validateOtpRequestDto.getPhoneNumber());
                newUser.setPassword(passwordEncoder.encode(validateOtpRequestDto.getPassword()));
                userRepository.save(newUser);
                return Mono.just("User successfully registered.");
            } else {
                return Mono.error(new IllegalArgumentException("Username already exists."));
            }
        } else {
            return Mono.error(new IllegalArgumentException("Invalid OTP. Please try again."));
        }
    }

    public Mono<String> login(LoginRequestDto loginRequestDto) {
        User user = userRepository.findByUserName(loginRequestDto.getUserName());

        if (user != null && passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
            String otp = generateOTP();
            userOtpMap.put(user.getUserName(), otp);

            if (loginRequestDto.isRememberMe()) {
                userSessionMap.put(user.getUserName(), otp);
            }

            return Mono.just("Login OTP: " + otp);
        } else {
            return Mono.error(new IllegalArgumentException("Invalid credentials."));
        }
    }

    public Mono<String> forgotPassword(PasswordResetRequestDto passwordResetRequestDto) {
        String otp = generateOTP();
        otpMap.put(passwordResetRequestDto.getPhoneNumber(), otp);
        return Mono.just("Password reset OTP: " + otp);
    }

    public Mono<String> resetPasswordWithOTP(PasswordResetWithOTPRequestDto passwordResetWithOTPRequestDto) {
        String storedOtp = otpMap.get(passwordResetWithOTPRequestDto.getPhoneNumber());

        if (storedOtp != null && storedOtp.equals(passwordResetWithOTPRequestDto.getOtp())) {
            otpMap.remove(passwordResetWithOTPRequestDto.getPhoneNumber());

            if (!passwordResetWithOTPRequestDto.getNewPassword().equals(passwordResetWithOTPRequestDto.getConfirmPassword())) {
                return Mono.error(new IllegalArgumentException("New password and confirmation do not match."));
            }

            User user = userRepository.findByPhoneNumber(passwordResetWithOTPRequestDto.getPhoneNumber())
                    .orElseThrow(() -> new IllegalArgumentException("User not found."));
            user.setPassword(passwordEncoder.encode(passwordResetWithOTPRequestDto.getNewPassword()));
            userRepository.save(user);
            return Mono.just("Password successfully reset.");
        } else {
            return Mono.error(new IllegalArgumentException("Invalid OTP. Please try again."));
        }
    }

    public Mono<String> verifyLoginOTP(ValidateOtpRequestDto validateOtpRequestDto) {
        String storedOtp = userOtpMap.get(validateOtpRequestDto.getUserName());
        if (storedOtp != null && storedOtp.equals(validateOtpRequestDto.getOtp())) {
            userOtpMap.remove(validateOtpRequestDto.getUserName());
            return Mono.just("OTP verification successful. You are now logged in.");
        } else {
            return Mono.error(new IllegalArgumentException("Invalid OTP. Please try again."));
        }
    }

    public Mono<String> logout(String userName) {
        if (userSessionMap.containsKey(userName)) {
            userSessionMap.remove(userName);
            System.out.println("User session found and removed: " + userName);
            return Mono.just("User logged out successfully.");
        } else {
            System.out.println("No active session for user: " + userName);
            return Mono.error(new IllegalArgumentException("No active session for user."));
        }
    }

}
