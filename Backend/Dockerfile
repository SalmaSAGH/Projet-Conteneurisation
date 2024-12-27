# Utilisation d'une image officielle et minimale pour Java 17, basée sur Alpine Linux.
FROM openjdk:17-jdk-alpine

# Ajout d'un groupe et d'un utilisateur non-root pour exécuter l'application.
RUN addgroup -S spring && adduser -S spring -G spring

# Passage à l'utilisateur non-root créé précédemment.
USER spring:spring

# Définition d'une variable de build (ARG) pour le fichier JAR à copier.
ARG JAR_FILE=target/ *. jar

# Copie du fichier JAR généré par le projet dans l'image Docker.
COPY ${JAR_FILE} app.jar

# Déclaration du port sur lequel l'application écoutera (non obligatoire, mais informatif).
EXPOSE 9192

# Commande par défaut pour lancer l'application.
ENTRYPOINT ["java", "-jar", "/app.jar"]