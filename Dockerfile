FROM ruby:3.3
# ENV LC_ALL=C.UTF-8=value
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

ADD . /srv/jekyll

WORKDIR /srv/jekyll

RUN bundle install --gemfile=Gemfile

EXPOSE 4000
