FROM openjdk:18
COPY D387_sample_code-0.0.2-SNAPSHOT.jar /src/D387_sample_code-0.0.2-SNAPSHOT.jar
WORKDIR /src/
EXPOSE 8080
CMD ["java", "-jar", "D387_sample_code-0.0.2-SNAPSHOT.jar"]