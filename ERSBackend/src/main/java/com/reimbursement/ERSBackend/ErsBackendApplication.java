package com.reimbursement.ERSBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.reimbursement.models") // Scanning of entities in this package
@ComponentScan("com.reimbursement") // Scanning of all components in com.reimbursement
@EnableJpaRepositories("com.reimbursement.DAOs") // Enablement of JPA DAOs in this package
public class ErsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ErsBackendApplication.class, args);
	}
}
