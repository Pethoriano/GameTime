# Estágio de Build
FROM maven:3.9.5-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY src src
RUN mvn clean package -DskipTests

# Estágio de Produção
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/jogos-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]