# Sprout
Sprout is a MCQ (Multiple Choice Question) board exam reviewer that is available for mobile platforms

- Made with Vue-Ionic Framework
- Offline test banks
- Cross Platform



## _Android_
>https://drive.google.com/file/d/11Yfk9kkdeCkFkBqfNFPCiCiPbjoxuiu3/view?usp=sharing
## _iOS_
>_Due to Apple security restrictions, I cannot upload the app to be tested into devices other than my own._


## Features

- View and review questions from testbank
- Darkmode support
- Shortcuts for recently opened review materials
- Track your progress
- Navigate through answered questions

Sprout is a review app that will take your review on the go. I first created this app because I was dissatisfied from review center's app. They sell apps that seemed unreasonable for me.  

# Files
> The database files and app files are separated just like a backend and frontend software. However the backend files are not available online.
Before you can start the project you must setup the required files first.
You need to do the following setup on each folder
~~~sh
cd /path/to/SproutDB
npm install
~~~
~~~sh
cd /path/to/SproutApp
npm install
~~~

## Database
> The database files are included in the SproutDB folder.
It is a web server made with nodejs with a basic file system database.
Upon uploading test questions, a json file is created which is then moved into the Sprout App before an update.
It may seem daunting for the developer and the user to make content changes this way, but it enables the app to be completely free. Also, i would like to review the materials myself before uploading so i could somehow learn and find small errors because content is crucial.

## App
> The app is made with vue-ionic using javascript. By the time I was coding it, the framework is still in it's early stable releases. I cannot walk you through the code line by line because I myself was heavily relying on documentation that time.   
The database is "baked" inside the app so that it won't need a server in it's runtime.
This app is basically a webapp wrapped by some native functionalities.
