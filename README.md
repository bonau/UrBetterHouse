# UrBetterHouse Project

A house marketplace PoC written in Ruby on Rails.

## Requirements

* Ruby 2.7.2
* Rails 6.0.5
* Node 12.22.12
* Yarn 1.22.19

## Installation

```bash
# rails db:migrate
# rails scraper:ur_house
# rails ur_better_house:demo_accounts
```

## Demo Account

* role: admin
  * email: zeus@somemail.com
  * password: isthat2022

* role: user
  * email: meme@somemail.com
  * password: isthat2022

Due to token authentication system, each account has only one valid session at a time.
If the login user has "admin" role, the UI AppBar will reveal in purple, so that can
edit properties.

## Before deploy to Heroku

If using Travis-ci/cd solution, don't forget to set HEROKU_API_KEY, HEROKU_APP,
and HEROKU_BRANCH in Travis project settings.

Make sure you have nodejs buildpack added, otherwise the engine in package.json
will take no effect.

```bash
# heroku buildpacks:add heroku/nodejs
# heroku buildpacks:add heroku/ruby
```

and then import data seed as "Installation" part above:

```bash
# heroku run -a APP_NAME rails db:migrate
# heroku run -a APP_NAME rails scraper:ur_house
# heroku run -a APP_NAME rails ur_better_house:demo_accounts
```
