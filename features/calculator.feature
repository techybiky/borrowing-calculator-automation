Feature: Borrowing Power Calculator
  As a user
  I want to calculate how much I can borrow
  So that I can understand my borrowing capacity

  Background:
    Given I navigate to the borrowing power calculator
    And the calculator form is loaded

  Scenario: Calculate borrowing power for a single applicant
    Given I select "Single" as the application type
    And I select "0" dependants
    And I select "Home to live in" as the property type
    And I enter "120000" as annual income
    And I enter "0" as other annual income
    And I enter "2000" as monthly living expenses
    And I enter "0" as current home loan monthly repayments
    And I enter "0" as other loan monthly repayments
    And I enter "0" as other monthly commitments
    And I enter "0" as total credit card limits
    When I click the "Work out how much I could borrow" button
    Then the borrowing amount should be displayed
    And the borrowing amount should be greater than "0"

  Scenario: Validate form clears when Start Over button is clicked
    Given I have filled the form with sample data:
      | Application Type           | Single              |
      | Number of Dependants       | 0                   |
      | Property Type              | Home to live in     |
      | Annual Income              | 85000               |
      | Other Annual Income        | 10000               |
      | Monthly Living Expenses    | 1500                |
      | Home Loan Monthly Payments | 500                 |
      | Other Loan Monthly Payments| 200                 |
      | Other Monthly Commitments  | 100                 |
      | Total Credit Card Limits   | 5000                |
    When I click the "Work out how much I could borrow" button
    And I click the "Start over" button
    Then the form should be cleared
    And the annual income field should be empty
    And the borrowing amount should display "We estimate you could borrow:"
