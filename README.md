# kitchen-app
By: Ahsan Hussain

Welcome to Anitha's kitchen web app repo! The purpose of the web app is to give Anitha a look at the data stored in her system. The web app can filter on the actions, stations, and dishes made in her kitchen. Then the results can be looked through in a list and the durations of each eaction can be compared using donut charts. 

Instructions to run
----------

**Docker method** (reccomended)

The frontend and backed of the web app have been placed into two different Docker images. The containers must be running on the same host machine with Internet access in order for the system to work correctly. 

1. Pull down the two Docker images with the following commands:

`dokcer pull ahsanhussain88/kitchen-back-end`
    
`docker pull ahsanhussain88/kitchen-front-end`

2. Run the Docker images with the following commands. It is best to enter the commands in seeprate command line interfaces.

`docker run -it -p 5000:5000 --rm --name kitchen-backend ahsanhussain88/kitchen-back-end`

`docker run -it -p 8080:8080 --rm --name kitchen-frontend ahsanhussain88/kitchen-front-end`

3. Open a web browser on the host machine and visit: 

 `http://localhost:8080`
 
 **Non Docker method** 
 
The whole application can be run without relying on Docker. The system will only work with both applications run on the same machine with Internet access. Node (> v10.16.0) and python3 are dependencies. 

1. Clone the source code with the following command. OR unzip the contents of the source code in kitchen-app.git. 

`git clone https://github.com/AhsanHussain8/kitchen-app.git`
 
2. In a command prompt, navigate to the kitchen-app-db-client directory.

3. Run the following command to install dependencies:

`python3 -m pip install --no-cache-dir -r requirements.txt`

4. Add an enviornment variable with the following command:

`export FLASK_APP=dbClient.py`

5. Run the following command to start the backend server:

`flask run --host=0.0.0.0`
 
6. In a seperate command prompt, navigate to the kitchen-app-frontend directory.

7. Run the following command to install dependencies:

 `npm install`
 
8. Run the following command to serve the webpage:
 
 `npm run serve`
 
 
9. Open a web browser on the host machine and visit: 

 `http://localhost:8080`

Screenshots
----------

![screenshot 1](/Screenshots/screenshot1.png?raw=true)

![screenshot 2](/Screenshots/screenshot2.png?raw=true)
