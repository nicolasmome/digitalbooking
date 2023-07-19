package com.grupo9.digitalBooking.music.model.config;

import com.grupo9.digitalBooking.music.model.jwt.JwtRequestFilter;
import com.grupo9.digitalBooking.music.model.service.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailServiceImpl userDetailServiceImpl;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/login").permitAll()
                .antMatchers(HttpMethod.GET, "/categories", "/categories/{id}", "/instruments", "/instruments/{id}", "/instruments/category/{id}", "/instruments/city/{city}", "/branches", "/branches/${id}").permitAll()
                .antMatchers(HttpMethod.POST, "/users").permitAll()

                .antMatchers(HttpMethod.GET, "/bookings", "/bookings/{id}").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/bookings").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/users", "/bookings").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/bookings/{id}").hasAnyAuthority("USER", "ADMIN")

                .antMatchers(HttpMethod.GET,  "/users", "/rols", "/brands", "status", "/instrumentDetails", "/images").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "/rols", "/categories", "/instruments", "/status", "/brands", "/instrumentDetails", "/images").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT, "/rols", "/categories", "/instruments", "/status", "/brands", "/instrumentDetails", "/images").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/users", "/rols", "/categories", "/instruments", "/status", "/brands", "/instrumentDetails", "/images").hasAnyAuthority("ADMIN")
                .anyRequest().authenticated()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }


    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(userDetailServiceImpl);
        return provider;
    }

}
