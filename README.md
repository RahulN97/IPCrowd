# IPCrowd

## Overview
This is a prototype designed to showcase the functionalities and interactions of the different modules involved in a PNAMBIC demo. The web-app uses Bootstrap and jQuery for the front-end framework, and currently uses python scripts to simulate any back-end operations. The following instructions and guide only apply for the version of the app that will be used in the modular demo.

## Installation & Software Setup
Here are installation/set-up instructions for Mac OS X and other UNIX-based operating systems.
1. Make sure python and pip are installed. You must use python2.7 in your virtual environment in order to successfully run the scripts.
2. Wherever you want to store this project, create a directory for this github repo and navigate into it
   ```
   mkdir VIP
   cd VIP/
   ```
3. Clone the github repo
   ```
   git clone https://github.gatech.edu/rnambiar8/IPCrowd
   ```
4. Install and create a virtual environment. This will allow you to execute any script and locally host the web-app without having to worry about software dependencies.
   
   The following lines of code should set up a virtualenv and install all dependencies.
   ```
   pip install virtualenv
   virtualenv vip-venv --system-site-packages
   source ./vip-venv/bin/activate
   pip install -r IPCrowd/requirements.txt
   ```
5. Now set up live-server
   ```
   brew update
   brew install npm
   npm install live-server
   ```
   If you're having trouble with the last command, try downloading and installing the recommended version for most users from the [NodeJS library](https://nodejs.org/en/), and run the command again.

## Documentation & Guide
Navigate into this github-repo, and run live-server in order to launch the localhost on your browser. Please use chrome to avoid potential bugs.
```
cd IP-Crowd/
live-server
```

Since we haven't set up a database yet, information will stored on the server-side (your local machine) in csv and txt files. The user and software modules will interact with the web-app in the demo as follows:

<img src="https://puu.sh/zwdgI/b1fe2b12be.png" width="600">

1. User is presented the original image on the localhost, and is prompted to make annotations and answer the question.
2. Upon clicking submit, two data files are downloaded from the browswer and will appear in your default downloads folder.
   - Cog Sci:
      - Reads annotation and answer data
      - Edits the question.txt file with a new question based on the previous annotation and answer data
      - Decides how the image should be edited for the new question and sends a request to the Image Nav module
        - Options: Show original image, show specific quadrant (choose from {1,2,3,4}), blur quadrants (choose from {1,2,3,4})
   - Image Nav:
      - Executes Images/img_modify.py with Cog Sci module's request
      - img_modify.py takes in several arguments depending on the command:
        - Show original image:
          ```
          python img_modify.py <image_name>.jpg original
          python img_modify.py dog-park.jpg original
          ```
        - Show specific quadrant:
          ```
          python img_modify.py <image_name>.jpg show <quadrant number>
          python img_modify.py dog-park.jpg show 3
          ```
        - Blur specific quadrants:
          ```
          python img_modify.py <image_name>.jpg blur <list of quadrants separated by comma> <blur intensity>
          python img_modify.py dog-park.jpg blur 2,3 10
          ```
   - Gamification:
      - Execute point_calc.py script which will update the user's points based on the annotations and answer data. The script finds your operating system's default download location, and recursively searches for annotations_ipcrowd.csv and answers_ipcrowd.csv
        ```
        python point_calc.py
        ```
3. The Platform/UI component will read question.txt and points.txt to display the new question and user points respectively. The img_modify.py script will have automatically updated the localhost with the appropriate image.
4. The user will either repeat step 1 or the process will have terminated (decided by cog. sci. module).
        
