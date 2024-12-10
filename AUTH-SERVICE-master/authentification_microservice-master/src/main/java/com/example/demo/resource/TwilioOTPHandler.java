package com.example.demo.resource;

import com.example.demo.dto.*;
import com.example.demo.service.TwilioOTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class TwilioOTPHandler {

    @Autowired
    private TwilioOTPService service;

    public Mono<ServerResponse> signUp(ServerRequest serverRequest) {
        return serverRequest.bodyToMono(SignUpRequestDto.class)
                .flatMap(service::signUp)
                .flatMap(response -> ServerResponse.status(HttpStatus.CREATED)
                        .body(BodyInserters.fromValue(response)));
    }

    public Mono<ServerResponse> validateSignUpOTP(ServerRequest serverRequest) {
        return serverRequest.bodyToMono(ValidateOtpRequestDto.class)
                .flatMap(service::validateOTPForSignUp)
                .flatMap(response -> ServerResponse.status(HttpStatus.OK)
                        .body(BodyInserters.fromValue(response)));
    }

    public Mono<ServerResponse> resetPasswordWithOTP(ServerRequest serverRequest) {
        return serverRequest.bodyToMono(PasswordResetWithOTPRequestDto.class)
                .flatMap(service::resetPasswordWithOTP)
                .flatMap(response -> ServerResponse.status(HttpStatus.OK)
                        .body(BodyInserters.fromValue(response)));
    }


    public Mono<ServerResponse> login(ServerRequest serverRequest) {
        return serverRequest.bodyToMono(LoginRequestDto.class)
                .flatMap(service::login)
                .flatMap(response -> ServerResponse.status(HttpStatus.OK)
                        .body(BodyInserters.fromValue(response)));
    }

    public Mono<ServerResponse> validateLoginOTP(ServerRequest serverRequest) {
        return serverRequest.bodyToMono(ValidateOtpRequestDto.class)
                .flatMap(service::verifyLoginOTP)
                .flatMap(response -> ServerResponse.status(HttpStatus.OK)
                        .body(BodyInserters.fromValue(response)));
    }

    public Mono<ServerResponse> forgotPassword(ServerRequest serverRequest) {
        return serverRequest.bodyToMono(PasswordResetRequestDto.class)
                .flatMap(service::forgotPassword)
                .flatMap(response -> ServerResponse.status(HttpStatus.OK)
                        .body(BodyInserters.fromValue(response)));
    }
    public Mono<ServerResponse> logout(ServerRequest serverRequest) {
        String userName = serverRequest.pathVariable("userName");
        return service.logout(userName)
                .flatMap(response -> ServerResponse.status(HttpStatus.OK)
                        .body(BodyInserters.fromValue(response)));
    }
}