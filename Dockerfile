FROM ruby:3.3

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

WORKDIR /srv/jekyll

RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential git \
  && rm -rf /var/lib/apt/lists/*

COPY Gemfile Gemfile.lock ./

RUN bundle config set path /usr/local/bundle \
  && bundle install

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling"]
