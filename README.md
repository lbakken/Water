# Water
Repository for Water application

## First Time Installation Steps:
* `npm i`        - Install all npm dependencies  
* `npm test`     - Ensure the project works as intended  
* `npm start`    - Launch the Dev-Server on your localhost  

## Branch Development Strategy
|--Master  
|	|--Dev1  
|	|	|--Development1  
|	|	|--(...)  
|	|	|--Developmentn  
|	|  
|	|--Dev2  
|	|	|...  

* The Master branch will be linked to the Heroku service.
	* On a push to master, the application will be built and sent to Heroku
* The Dev branches are feature specific
	* For example, there will be a Dev branch for implementing login
	* This branch will be merged into Master when it is complete
	* Only one Dev branch will be open at a time
* The Development branches will be used by the individual project members to develop the feature

## Trello Link - Auto Board Member
https://trello.com/invite/b/dSRrvyfR/37dcdd3eef4cb950ae7269e3aa6a702b/water
* As a ___ 		(User, Developer, Project Manager, etc.)
* I want ___	(An exception to be thrown)
* So that ___	(It is easier to locate errors)

## Slack Link
https://team-software-dev.slack.com