# exercisedb

import requests

url = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/back"

querystring = {"limit":"10"}

headers = {
	"X-RapidAPI-Key": "493ed86dd6msh68811499276d21bp1def8ejsn98e44127abce",
	"X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())