#@Demo
Feature: Page Load Performance Testing

  Scenario Outline: Validate page load performance
    When I navigate to the login page for validation response
    Then the page should render in less than <render_time> ms
    And the page should fully load in less than <load_time> ms

    Examples:
      | render_time | load_time |
      |        1000 |      1000 |
      |         800 |       800 |
