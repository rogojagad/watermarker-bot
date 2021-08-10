FROM node:12

# Setup Workdir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy App Source Code
COPY . .

# Install Dependency
RUN npm install

# Expose Ports
EXPOSE 8080

# Run Dev Server
CMD ["npm", "run", "serve"]