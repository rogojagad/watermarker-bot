FROM node:14.5.0-alpine

# Setup Workdir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy source file
COPY . .

# Install dependency
RUN npm i -f

# Expose port
EXPOSE 5000

# Start
CMD ["npm", "run", "start"]

