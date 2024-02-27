create table if not exists public.teams (
  id serial primary key,
  name text not null unique,
  slug text not null unique,
  description text
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
