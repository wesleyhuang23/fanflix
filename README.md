# Fanflix
Find movies with detailed movie information and trailers. Write your own reviews and create your personal watchlist. Built in AngularJS, Node, SQL

# Billboard
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/billboard.png?raw=true)
The Billboard changes based on the most popular film, based on the mdb api.

# Carousel
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/slider.png?raw=true)
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/watchlist-home.png)
Using an ng-repeat to display films that are coming soon or now playing in theaters. When hovered over the poster will scale up and display a summary of the movie on top of the poster dimming the background so the text can be read. When the user creates their own watchlist of movies it will appear as the first carosel. So when they login they will be greeted by the movie that they need to watch. When the user logs out the watchlist carousel disapears.

# Search for Movies, People or Theaters
![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/search.png?raw=true) ![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/people-search.png?raw=true) ![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/theater-search.png?raw=true)
The search view will give you realtime results as your type in the search bar. This is done by using Jquery. You can search for over 900,000 titles, based on the movie database api and will be upadted when new titles are added into the database.

# Movie Details
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/details.png?raw=true)
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/lead%20cast%20and%20trailer.png?raw=true)
Every movie you can search for on Fanflix will have its own detail pages. This applies to all 2 million possible titles. As you scroll you get more information about the movie as well as trailers, high resolution backdrops that make great desktop wallpapers and user reviews. Under the poster if the film is not currently in theaters, but is availible on itunes or google play, it will display the two platform indicators. These will take you to their site where users can make their purchase of the movie. Scrolling to the bottom reveals movies that are similar and recommendations by users.sdflknlfvljndfvnjdfvnnvnvnn

# Creating Movie List
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/mylist2.png)
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/mylist.png)
Users have the ability to creat their own movie list. Watchlist for the movie they want to see. Watched indicating they have seen it and favorites for the movies they really liked. Each user can add a movie from a movies detail page, which will update right away. The user can change the status of the movie when they hover over the poster. Done in real time and no need to refresh the page. The list is based off of the users id when they log in so every user will have their own list of movies.

# User Movie Reviews
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/writing%20reviews.png)
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/user-review.png)
Users have the ability to write their own movie reviews and git it a score. The score color will be based on the rating they give the movie, green for great, yellow for passable, and red for bad. Once they write the review the review will apear on the movies review section indicating which user wrote the review. Doing a join SQL call I was able to merge the review table with the users table and make them show up here.

# Full Cast and Crew
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/fullcast.png?raw=true)
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/crew.png?raw=true)
Clicking on the full cast and crew button on the details page will list the full list of actors playing in the movie as well as the crew of directors, producers and camera people who worked on the film. Clicking on anyone of these will take you to their detail page. If the image of the actor is not availible then it will display the first letter of the persons name as a replacement using a simple conditional.

# People
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/emma%20with%20background.png)
Clicking on an actors photo will take you to their detail page where it shows their bio and their body of work. Images of the actors from the movies they play will apear right after the known work row and clicking the image will take you to the actual movie details page. Passing in the actors id into state params. 

# Theater Showtimes
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/googlemaps.png)
Passing the theaters id as state params and displaying the specific theater with the movies and showtimes that are availible. Clicking on the showtimes will take you to fandango. A google map will apear on the top right of where the theater is located and clicking on the directions button can take users to google maps. 

# Login
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/login.png?raw=true)
Users can login using facebook. This is accomplished using facebook auth. Once the user logs in they can create their own user reviews and movie list. Keep a list of the movies they want to watch, which movies are their favorites. Facebook auth was most challenging in that I had to match the users facebook id to every object they manipulate so every user would get their own list and custom pages. Making sure every call to the database was the correct was the most challenging of the project. 

# Mobile Responsive
 Movie Details             |Overview                   | Search                    | People                    
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/mobile-responsive2.png?raw=true)  |  ![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/mobile-responsive3.png?raw=true) | ![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/starwars.png) | ![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/leo1.png)

The site is mobile responisve. Using media queries to change the design and positioning of most elements. 



