#!/bin/bash

read -p "Enter the new app name: " appName
npx react-native-rename "$appName" --skipGitStatusCheck