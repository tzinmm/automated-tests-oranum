Feature: Sign up dialog

    Scenario Outline: Sign up dialog apppears when a toolbar's icon is clicked
        Given I am in Oranum Home Page
        When I click on Live Psychics button
        And I click on a livestream
        And I click on icon "<icon>"
        Then I should see a sign up dialog

        Examples:
            | icon          |
            | favoriteIcon  |
            | surpriseIcon  |
            | awardsIcon    |
            | cam2CamIcon   |
            | buyCreditIcon |

    Scenario Outline: Sign up dialog apppears when 'Start Private Show' is clicked
        Given I am in Oranum Home Page
        When I click on Live Psychics button
        And I click on a livestream
        And I click on Start Private Show button at "<position>"
        Then I should see a sign up dialog

        Examples:
            | position |
            | 6        |
            | 7        |

    Scenario: Sign up dialog apppears when 'Buy Credits' is clicked
        Given I am in Oranum Home Page
        When I click on Live Psychics button
        And I click on a livestream
        And I click on Buy Credits button
        Then I should see a sign up dialog