@REQ-3
Feature: Search for Psychics from Home Page

Scenario: Search Input field displays Placeholder
        Given I am in Oranum Home Page
        When I click on the Search icon
        Then I should see the Placeholder

    Scenario Outline: Search for Psychics by partial text
        Given I am in Oranum Home Page
        When I click on the Search icon
        When I enter a "<partialText>"
        When I click Show All Results
        Then I should see results that contain the partial text "<partialText>"

        Examples:
            | partialText |
            | Matt        |
            | Myst        |
            | Ann         |
            | psy         |
            
    Scenario Outline: Search for Psychics by full text
        Given I am in Oranum Home Page
        When I click on the Search icon
        When I enter a "<psychicName>"
        When I click on the result with the exact match "<psychicName>"
        Then I should see the Psychic "<psychicName>" profile

        Examples:
            | psychicName  |
            | MattWarren   |
            | MysticMilena |
            | EternalFlame |