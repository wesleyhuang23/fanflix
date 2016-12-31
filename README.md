# Fanflix
Find movies with detailed movie information and trailers. Write your own reviews and create your personal watchlist. Built in AngularJS, Node, SQL

# Billboard
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/billboard.png?raw=true)
The Billboard changes based on the most popular film, based on the mdb api.

# Carousel
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/slider.png?raw=true)
Using an ng-repeat to display films that are coming soon or now playing in theaters. When hovered over the poster will scale up and display a summary of the movie on top of the poster. When the user creates their own watchlist of movies it will appear as the first carosel. So when they login they will be greeted by the movie that they need to watch.

# Search for Movies, People or Theaters
![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/search.png?raw=true) ![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/people-search.png?raw=true) ![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/theater-search.png?raw=true)

The search view will give you realtime results as your type in the search bar. This is done by using Jquery. You can search for over 2 million titles, based on the movie database api and will be upadted when new titles are added into the database.

# Movie Detail
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/details.png?raw=true)
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/lead%20cast%20and%20trailer.png?raw=true)
Every movie you can search for on Fanflix will have its own detail pages. This applies to all 2 million possible titles. As you scroll you get more information about the movie as well as trailers, high resolution backdrops that make great desktop wallpapers and user reviews. Under the poster if the film is not currently in theaters, but is availible on itunes or google play, it will display the two platform indicators. These will take you to their site where users can make their purchase of the movie.

# Full Cast and Crew
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/fullcast.png?raw=true)
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/crew.png?raw=true)
Clicking on the full cast and crew button on the details page will list the full list of actors playing in the movie as well as the crew of directors, producers and camera people who worked on the film. Clicking on anyone of these will take you to their detail page. If the image of the actor is not availible then it will display the first letter of the persons name as a replacement using a simple conditional.

# People
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/person2.png?raw=true)
Clicking on an actors photo will take you to their detail page where it shows their bio and their body of work. Passing in the actors id into state params.

# Theater Showtimes
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/showtimes.png?raw=true)
Passing the theaters id as state params and displaying the specific theater with the movies and showtimes that are availible. Clicking on the showtimes will take you to fandango. Clicking on the address of the theater will take you to google maps with a pin dropped on the location of the theater.

# Login
![alt tag](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/login.png?raw=true)
Users can login using facebook. This is accomplished using facebook auth. Once the user logs in they can create their own user reviews and movie list. Keep a list of the movies they want to watch, which movies are their favorites. Facebook auth was most challenging in that I had to match the users facebook id to every object they manipulate so every user would get their own list and custom pages. Making sure every call to the database was the correct was the most challenging of the project. 

# Mobile Responsive
 Backdrop and Poster       |Overview                   | Search
:-------------------------:|:-------------------------:|:-------------------------:
![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/mobile-responsive2.png?raw=true)  |  ![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/mobile-responsive3.png?raw=true) | ![](https://github.com/wesleyhuang23/fanflix/blob/master/screenshots/mobile-responsive4.png?raw=true) 

The site is mobile responisve. Using media queries to change the design and positioning of most elements. 



