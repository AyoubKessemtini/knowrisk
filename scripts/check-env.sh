
# Function to display a success message
function success_message {
  echo "\033[32m[SUCCESS]\033[0m $1"
}

# Function to display an error message
function error_message {
  echo "\033[31m[ERROR]\033[0m $1"
}

# Function to display a command title
function command_title {
  echo "\033[1m$1\033[0m"
}

# Flag to track if any errors occurred
errors_found=false

# Display script start
command_title "Starting dev environment check ..."

# Check Node.js version
node_version=$(node -v 2>&1)
if [ $? -eq 0 ]; then
  # Check if the Node.js version is >= 20
  if [[ "$node_version" =~ ^v([0-9]+)\. ]]; then
    major_version="${BASH_REMATCH[1]}"
    if [ "$major_version" -ge 20 ]; then
      success_message "Node.js is installed ($node_version)"
    else
      error_message "Node.js version $node_version is not supported. Please install Node.js version 20 or higher."
      errors_found=true
    fi
  else
    error_message "Unable to determine Node.js version."
    errors_found=true
  fi
else
  error_message "Node.js is not installed. Please use \033[1mnodenv install\033[0m or \033[1mnvm install 20\033[0m to install Node.js."
  errors_found=true
fi

# Check Yarn version
yarn_version=$(yarn -v 2>&1)
if [ $? -eq 0 ]; then
  success_message "Yarn is installed ($yarn_version)"
else
  error_message "Yarn is not installed ---> \033[1mnpm --global install yarn\033[0m to install"
  errors_found=true
fi

ruby_version=$(ruby -v 2>&1)
if [ $? -eq 0 ]; then
  # Check if the Ruby version is 2.7.6
  if [[ "$ruby_version" == "ruby 2.7.6"* ]]; then
    success_message "Ruby is installed ($ruby_version)"
  else
    error_message "Ruby version $ruby_version is not supported. Please install Ruby 2.7.6."
    errors_found=true
  fi
else
  error_message "Ruby is not installed. Please use \033[1mrbenv install 2.7.6\033[0m to install Ruby 2.7.6."
  errors_found=true
fi

# Check cocoapods version
cocoapods_version=$(pod --version 2>&1)
if [ $? -eq 0 ]; then
  success_message "cocoapods is installed ($cocoapods_version)"
else
  error_message "cocoapods is not installed ---> \033[1myarn install:bundle\033[0m to install"
  errors_found=true
fi

# Check watchman version
watchman_version=$(watchman -v 2>&1)
if [ $? -eq 0 ]; then
  success_message "watchman is installed ($watchman_version)"
else
  error_message "watchman is not installed ---> \033[1mbrew install watchman\033[0m to install"
  errors_found=true
fi

# Display final result
if [ "$errors_found" = true ]; then
  echo "\033[1m\033[31m[FAILURE] Dev environment check failed\033[0m"
  exit 1
else
  echo "\033[1m\033[32m[SUCCESS] Dev environment check passed\033[0m"
  exit 0
fi
