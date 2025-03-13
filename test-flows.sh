
#!/bin/bash

# Check if the server is already running
if ! nc -z localhost 3001; then
  echo "Starting server..."
  node server.js &
  SERVER_PID=$!
  echo "Server started with PID: $SERVER_PID"
  # Wait for server to start up
  sleep 2
else
  echo "Server already running on port 3001"
  SERVER_PID=""
fi

# Install puppeteer if not already installed
if ! npm list puppeteer >/dev/null 2>&1; then
  echo "Installing puppeteer..."
  npm install puppeteer --no-save
fi

# Run the test script
echo "Running end-to-end tests..."
node test-flows.js

# If we started the server, stop it
if [ -n "$SERVER_PID" ]; then
  echo "Stopping server..."
  kill $SERVER_PID
fi

echo "Testing complete. Check flow-map.html for the visual flow map."
