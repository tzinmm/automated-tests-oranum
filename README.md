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

- REQ-3 & REQ-2

npx codeceptjs run --grep "REQ-3" --reporter mochawesome

- REQ-4

npx codeceptjs run --grep "REQ-4" --reporter mochawesome

- REQ-5

npx codeceptjs run --grep "REQ-5" --reporter mochawesome

# Steps to open Mochawesome report

**Before following the step, the tests should be executed with the command --reporter mochawesome
as appears in the above examples.

1- On project's root folder locate the mochawesome-report folder

2- Right-click on mochawesome.html file

3- Open file in explorer (Windows)

4- Open the file in a browser

# Additional Information

In a full execution, it is expected to have 1 failed test case.

There is a discrepancy between the REQ-4 and the current navigation on the page because the "Start Private Show" button, located at the top right corner, does not open the Sign Up overlay instead, the Free Registration prompt appears.

Test Case:  Sign up dialog apppears when 'Start Private Show' is clicked {"position":"7"}


# Final notes
Thank you for taking the time to review this code and I honestly had much fun creating this project with CodeceptJS.