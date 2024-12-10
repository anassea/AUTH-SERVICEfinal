package com.example.demo.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class TwilioRouterConfig {

    @Autowired
    private TwilioOTPHandler handler;

    @Bean
    public RouterFunction<ServerResponse> handleSMS() {
        return RouterFunctions.route()
                .POST("/router/signUp", handler::signUp)
                .POST("/router/validateSignUpOTP", handler::validateSignUpOTP)
                .POST("/router/login", handler::login)
                .POST("/router/validateLoginOTP", handler::validateLoginOTP)
                .POST("/router/resetPasswordWithOTP", handler::resetPasswordWithOTP)
                .POST("/router/logout/{userName}", handler::logout)
                .POST("/router/forgotPassword", handler::forgotPassword)
                .build();
    }
}
