@REQ-1
Feature: Home Page

    Scenario: "Show More" button loads more psychics
        Given I am in Oranum Home Page
        When I scrolldown to Show More button
        And I click Show More button
        Then I should see more Psychic Cards

    Scenario: There are no visible duplicated psychic cards
        Given I am in Oranum Home Page
        Then I should see unique psychic cards

    Scenario: Each psychic card contains details
        Given I am in Oranum Home Page
        Then I see a nickname in each card
        Then I see an image in each card
        Then I see a language label and flags in each card
        Then I see a valid status in each card
        Then I see 5 stars for rating in each card