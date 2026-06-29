Feature: Borrowing Power Calculator

  Background:
    Given I navigate to the borrowing power calculator

  @Borrowing
  Scenario: Verify borrowing estimate for a single applicant
    Given I select "Single" as the application type
    And I select "0" dependants
    And I select "Home to live in" as the property type
    And I enter "100000" as annual income
    And I enter "10000" as other annual income
    And I enter "2000" as monthly living expenses
    And I enter "0" as current home loan monthly repayments
    And I enter "100" as other loan monthly repayments
    And I enter "0" as other monthly commitments
    And I enter "10000" as total credit card limits
    When I click the "Work out how much I could borrow" button
    Then the borrowing estimate should be "$493,000"
    When I click the "Start over" button
    Then all calculator fields should be reset
