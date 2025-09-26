# Étape 1 : Build du backend
FROM maven:3.9.2-eclipse-temurin-20 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Étape 2 : Exécution du backend
FROM eclipse-temurin:20-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Profil par défaut (prod)
ENV SPRING_PROFILES_ACTIVE=prod

# On définit des variables par défaut
ENV DB_HOST=db \
    DB_PORT=3306 \
    DB_NAME=burgermanagement \
    DB_USER=root \
    DB_PASSWORD=root

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
