# Utiliser une image JDK
FROM openjdk:17-jdk-alpine
# Copier le jar de l'application dans l'image Docker
COPY target/authentification_microservice-0.0.1-SNAPSHOT.jar app.jar
# Exposer le port
EXPOSE 8080
# Démarrer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
