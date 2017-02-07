# README

This is the source code to the Headbanger landing page.

## Setup

```
$ rvm install $(cat .ruby-version)
$ rvm gemset create $(cat .ruby-gemset)
$ rvm use $(cat .ruby-version)-$(cat .ruby-gemset)
$ gem install bundler
$ bundle install
$ npm install
$ bower install
```

## Building

```
$ grunt build
$ darkhttpd dist/ --daemon
$ grunt watch
```

## Deployment

```
$ ENV=staging grunt deploy
```
