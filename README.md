# automated-tests-oranum
This repository contains the test cases for Oranum, which is the world’s largest spiritual community, and the only live webcam platform that allows users to video chat with psychics and spiritual advisors live and in the comfort of their own home.

Website: https://www.oranum.com/en/new 

# Getting Started
Install the packages with:

npm i

# Executing ALL the test cases
npx codeceptjs run --features --reporter mochawesome

# Executing test cases per requirement 

- REQ-1
npx codeceptjs run --grep "REQ-1" --reporter mochawesome

- REQ-2
npx codeceptjs run --grep "REQ-2" --reporter mochawesome

- REQ-3
npx codeceptjs run --grep "REQ-3" --reporter mochawesome

- REQ-4
npx codeceptjs run --grep "REQ-4" --reporter mochawesome

- REQ-5
npx codeceptjs run --grep "REQ-5" --reporter mochawesome

# Steps to open Mochawesome report

1- On project's root folder locate the mochawesome-report folder

2- Right-click on mochawesome.html file

3- Open file in explorer (Windows)

4- Open the file in a browser


# Final notes
Thank you for taking the time to review this code and I honestly had much fun creating this project with CodeceptJS.