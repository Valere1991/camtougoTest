FROM openjdk:11
ADD target/backendCamtougo.jar backendCamtougo.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "/backendCamtougo.jar"]