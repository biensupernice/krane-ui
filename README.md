# Bootstraping the Docker image

```
# Build the image
docker build -t krane-ui .
# Tag the image
docker tag krane-ui docker.io/biensupernice/krane-ui
# Push to docker registry
docker push docker.io/biensupernice/krane-ui
```
