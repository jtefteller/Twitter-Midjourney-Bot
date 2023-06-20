build:
	@docker build -f Dockerfile -t twitter-bot .

run: 
	@docker run --env-file ./.env --rm -d twitter-bot
