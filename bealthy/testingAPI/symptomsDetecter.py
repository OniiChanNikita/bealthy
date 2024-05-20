import requests

url = "https://muscle-group-image-generator.p.rapidapi.com/getImage"

querystring = {"muscleGroups":"biceps,chest,hamstring","color":"200,100,80","transparentBackground":"0"}

headers = {
	"X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
	"X-RapidAPI-Host": "muscle-group-image-generator.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())