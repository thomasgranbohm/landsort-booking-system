#!/bin/bash

./docker/start artisan migrate:fresh

# Room: Höger
curl localhost:8080/rooms -X POST -d "location=Höger"
curl localhost:8080/rooms/1/bunks -X POST -d "location=A"
curl localhost:8080/rooms/1/bunks -X POST -d "location=B"
curl localhost:8080/rooms/1/bunks -X POST -d "location=C"

# Room: Vänster
curl localhost:8080/rooms -X POST -d "location=Vänster"
curl localhost:8080/rooms/2/bunks -X POST -d "location=A"
curl localhost:8080/rooms/2/bunks -X POST -d "location=B"
curl localhost:8080/rooms/2/bunks -X POST -d "location=C"
curl localhost:8080/rooms/2/bunks -X POST -d "location=D"
curl localhost:8080/rooms/2/bunks -X POST -d "location=E"

# Users
curl localhost:8080/users -X POST -d "email=thomas@granbohm.dev&firstname=Thomas&lastname=Granbohm&phonenumber=0736761614"
curl localhost:8080/users -X POST -d "email=sven.svensson@exempel.se&firstname=Sven&lastname=Svensson&phonenumber=0712345678"

# Bookings
curl localhost:8080/bookings -X POST -H "Content-Type: application/json" --data-raw '{"bunks":[2, 4, 6], "start_date": "2021-01-01", "end_date": "2021-01-06", "user_email": "thomas@granbohm.dev"}'
curl localhost:8080/bookings -X POST -H "Content-Type: application/json" --data-raw '{"bunks":[7], "start_date": "2021-01-04", "end_date": "2021-01-08", "user_email": "sven.svensson@exempel.se"}'

echo "";