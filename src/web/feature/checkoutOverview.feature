# @Demo
Feature: Overview Checkout
  As a user, 
  I want to use the overview checkout 
  So that I can check all information about the item I will buy, the prices and the shipping information.

  Background:
    Given the user has already logged in with username "standard_user" and password "secret_sauce"
    And the user is on the home page

  Scenario: Valitate with the checkout information before buy
    When The user clicks the Add to Cart button for the "Sauce Labs Bike Light" item
    And The user navigates to the cart
    And The user clicks Checkout button to go to the checkout page
    And The user fills in the required information firstname: "Son" lastname:"Nguyen" and postalcode: "57100"
    And Clicks Continue button
    Then Redirect to checkout overview page
    And Validate the item "Sauce Labs Bike Light" is exist and visible
    And Validate the item "Sauce Labs Bike Light" has the quantity is "1"
    And Validate the price of the total item: "$9.99"
    And Validate the price of the tax: "$0.80"
    And Validate the total price: "$10.79"
