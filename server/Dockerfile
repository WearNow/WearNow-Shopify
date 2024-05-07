# Use Ubuntu base image
FROM ubuntu:22.04

# Install system dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get install -y libgl1-mesa-glx && \
    apt-get install -y libgtk2.0-dev && \
    apt-get install -y libglib2.0-0 libsm6 libxrender1 libxext6

# Set the working directory
WORKDIR /app

# Copy the source code into the container
COPY . /app

# Install project dependencies
COPY ./requirements /app/requirements
RUN pip3 install --upgrade pip
RUN pip3 install -r ./requirements/prod.txt

# Copy the .env file
COPY ./src/.env /app/src


# Expose the desired port
EXPOSE 8000

# Set the entrypoint command
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
