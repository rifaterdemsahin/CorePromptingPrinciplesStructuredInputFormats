# Automated Video Shot Recorder Container
# Uses official Playwright container with Chromium & FFmpeg pre-installed
FROM mcr.microsoft.com/playwright:v1.49.1-noble

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install npm dependencies
RUN npm ci || npm install

# Copy application source files
COPY . .

# Ensure recordings directory exists
RUN mkdir -p /app/recordings

# Default command runs the shot recording automation
CMD ["npm", "run", "record"]
