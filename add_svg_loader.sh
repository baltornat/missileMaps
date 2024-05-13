#!/bin/bash

# Check if the file name is provided as an argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <file>"
    exit 1
fi

# Check if the file exists
if [ ! -f "$1" ]; then
    echo "File '$1' does not exist."
    exit 1
fi

# Define the content to append
content_to_append="{test: /\\\\.svg\\$/i, issuer: /\\\\\\.[jt]sx?\\$/, use: ['@svgr/webpack'],},"

# Use sed to remove other svg loaders
sed -i 's/|svg|//' "$1"

# Use sed to remove other svg loaders
sed -i 's/|svg//' "$1"

# Use sed to add new svg loader
sed -i "/rules: \[/a$content_to_append" "$1"

echo "Content has been successfully appended to '$1'."
