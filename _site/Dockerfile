FROM ruby:3.3

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

WORKDIR /srv/jekyll

# Copy only Gemfile to cache bundle install
COPY Gemfile Gemfile.lock ./

RUN bundle install

EXPOSE 4000

