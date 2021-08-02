#!/bin/sh
git pull origin
sudo docker build -t tokped-test.
sudo docker run -d --name tokped-test --restart=always -p 80:80 tokped-test:latest