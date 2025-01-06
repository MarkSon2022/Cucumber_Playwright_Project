@Demo
Feature: Overview Checkout
  As a user, 
  I want to use the overview checkout 
  So that I can check all information about the item I will buy, the prices and the shipping information.

  Background:
    Given the user has already logged in with username "standard_user" and password "secret_sauce"
    And the user is on the home page

  Scenario: Valitate with the checkout success after overview
    When The user clicks the Add to Cart button for the "Sauce Labs Bike Light" item
    And The user navigates to the cart
    And The user clicks Checkout button to go to the checkout page
    And The user fills in the required information firstname: "Son" lastname:"Nguyen" and postalcode: "57100"
    And Clicks Continue button
    And Clicks Finish button
    Then Validate Checkout Complete page
    And Validate Order Success information
    And Validate Ponny Express Image visible and have the right source image
