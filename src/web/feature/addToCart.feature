# @Demo
Feature: Add to cart test
  As a user 
  I want to ensure that add to cart work correctly
  So that I click to add the item and the cart will have the same item

  Background:
    Given the user has already logged in with username "standard_user" and password "secret_sauce"
    And the user is on the home page

  Scenario: Add the item to the cart and view card
    When User click to Add to Card button of "Sauce Labs Bike Light" item
    And User click to cart
    Then The item "Sauce Labs Bike Light" is on the cart page.
