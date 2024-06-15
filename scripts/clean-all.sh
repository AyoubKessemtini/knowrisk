#!/bin/bash

confirm_action() {
    echo "$(tput setaf 2)⚠️  Warning: This is a full clean.⚠️$(tput sgr0)"
    echo "$(tput setaf 3)Are you sure (Y/N)?$(tput sgr0) "
    while read -r -n 1 -s answer; do
        case $answer in
            [Yy]) retval=0; break ;;
            [Nn]) retval=1; break ;;
        esac
    done
    echo
    return $retval
}

if confirm_action; then
    echo "$(tput setaf 2)🚀 Cleaning cache...$(tput sgr0)"
    yarn clean:cache > /dev/null 2>&1 || true
    echo "$(tput setaf 2)Done...🎉$(tput sgr0)"

    echo "$(tput setaf 2)🚀 Cleaning ios...$(tput sgr0)"
    yarn clean:ios > /dev/null 2>&1 || true
    echo "$(tput setaf 2)Done...🎉$(tput sgr0)"

    echo "$(tput setaf 2)🚀 Cleaning android...$(tput sgr0)"
    yarn clean:android > /dev/null 2>&1 || true
    echo "$(tput setaf 2)Done...🎉$(tput sgr0)"

    echo

    echo "$(tput setaf 2)Clean up complete. You can now run 'yarn install:all'.$(tput sgr0)"
else
    echo "$(tput setaf 1)Aborting...$(tput sgr0)"
fi
