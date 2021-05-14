@REQ-5
Feature: Filtering by Category

    Scenario Outline: Filter Psychics by Categories
        Given I am in Oranum Home Page
        When I click on Live Psychics button
        And I filter by "<category>"
        Then I see the matching Psychics filtered by "<category>"

        Examples:
            | category              |
            | Love and Relationship |
            | Dream Interpretation  |
            | Astrology             |
            | Spiritual Guides      |
            | Home and Family       |
            | Numerology            |
