# @Demo 
Feature: User Authentication test
  As a user 
  I want to ensure that Login form work correctly
  So that I only enter valid credentials, submit with Login and redirect to the home page

  Background:
    Given User navigates to the application

  Scenario: Login with lock user account
    When User enter valid credentials : username as "locked_out_user" and password as "secret_sauce"
    And User click on the login button
    Then It still remain in login page with error message: "Sorry, this user has been locked out."

  Scenario: Login with invalid password
    When User enter valid credentials : username as "standard_user" and password as "1234"
    And User click on the login button
    Then It still remain in login page with error message: "Username and password do not match any user in this service"

  Scenario: Login with valid credentials
    When User enter valid credentials : username as "standard_user" and password as "secret_sauce"
    And User click on the login button
    Then Login should be success
