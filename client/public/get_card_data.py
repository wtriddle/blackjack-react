import json
import os
from pathlib import Path

# Get all file names in cards directory
p = Path('./cards').glob('*.png')               # All POSIXpath file names in the cards directory

# Determine card value from its string identifier
def get_value(path_str):
    value = 0                               # Numerical value of the card
    base_card = path_str[6:]                # Chop the cards/ portion from the string
    base_card = base_card.split("_")[0]     # Get first element from _ string seperator
    if(base_card in ("king", "queen", "jack")):
        value = 10
    elif(base_card in ("ace")):
        value = 1                           # Handle 11 case in front end
    else:
        value = int(base_card)

    return value


# Make a card data structure
card_data_structure = [
    {
        "file_name" : os.fspath(y),
        "value" : get_value(os.fspath(y))
    } for y in p
]

# Make JSON file out of card data structure
with open("sample.json", "w") as outfile:
    json.dump(card_data_structure, outfile)


