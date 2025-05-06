#!/bin/bash

brew install poppler

python3 -m venv tools
source tools/bin/activate

pip3 install --upgrade pip
pip install pdf2image Pillow