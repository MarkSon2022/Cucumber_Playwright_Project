# @Demo
Feature: Checkout Cart
  As a user, 
  I want to use the checkout functionality 
  So that I can fill in information and receive the correct receipt after purchase.

  Background:
    Given the user has already logged in with username "standard_user" and password "secret_sauce"
    And the user is on the home page

  Scenario: Checkout with empty firstname
    When The user clicks the Add to Cart button for the "Sauce Labs Bike Light" item
    And The user navigates to the cart
    And The user clicks Checkout button to go to the checkout page
    And The user fills in the required information firstname: "" lastname:"Nguyen" and postalcode: "57100"
    And Clicks Continue button
    Then Validate error message: "First Name is required"

  Scenario: Checkout with empty lastname
    When The user clicks the Add to Cart button for the "Sauce Labs Bike Light" item
    And The user navigates to the cart
    And The user clicks Checkout button to go to the checkout page
    And The user fills in the required information firstname: "Son" lastname:"" and postalcode: "57100"
    And Clicks Continue button
    Then Validate error message: "Last Name is required"

  Scenario: Checkout with empty firstname
    When The user clicks the Add to Cart button for the "Sauce Labs Bike Light" item
    And The user navigates to the cart
    And The user clicks Checkout button to go to the checkout page
    And The user fills in the required information firstname: "Son" lastname:"Nguyen" and postalcode: ""
    And Clicks Continue button
    Then Validate error message: "Postal Code is required"

  Scenario: Checkout with one item
    When The user clicks the Add to Cart button for the "Sauce Labs Bike Light" item
    And The user navigates to the cart
    And The user clicks Checkout button to go to the checkout page
    And The user fills in the required information firstname: "Son" lastname:"Nguyen" and postalcode: "57100"
    And Clicks Continue button
    Then Redirect to checkout overview page
