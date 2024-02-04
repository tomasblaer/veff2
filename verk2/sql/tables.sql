create table if not exists public.teams (
  id serial primary key,
  name text not null
);

create table if not exists public.games (
  id serial primary key,
  date timestamp not null,
  home integer not null,
  away integer not null,
  home_score integer not null,
  away_score integer not null,
  constraint fk_home foreign key (home) references teams(id),
  constraint fk_away foreign key (away) references teams(id)
);

create table if not exists public.users (
  id serial primary key,
  username text not null unique,
  password text not null
);
