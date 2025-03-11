#!/bin/bash

echo "Running end-to-end tests..."

# Simplify testing - don't try to manage server lifecycle
# Replit should already have the server running

# Run the test script
node test-flows.js

echo "Testing complete. Check flow-map.html for the visual flow map."