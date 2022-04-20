#!/bin/bash

deactivate
source venv/bin/activate

export FLASK_APP=app.py
nohup flask run -p 3501 &
