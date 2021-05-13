Feature: Filtering by Topics

    Scenario Outline: Topic Love and Relationship
        Given I am in Oranum Home Page
        When I click on Live Psychics button
        And I filter by "<topics>"
        Then I see the matching Psychics filtered by

        Examples:
            | topics                |
            | Love and Relationship |
            #| Tarot and Cards       |tarot,cards,reading|
            #| Dream Interpretation  |dream,analysis|
            #| Astrology             |astrology,horoscope|
            #| Spiritual Guides      |angel,spiritual,guidance,communication|
            #| Home and Family       |career,work,family,traveling|
            #| Numerology            |cards,guidancen,reading,life,path,karmic,numbers|