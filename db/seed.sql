create table questions (
    question_id serial primary key,
    text varchar,
    answer varchar
);

insert into questions (text, answer)
values ('What is the sexiest and least sexy name?', ''),
( 'What is invisible but you wish people could see?', '');

create table games (
    game_id serial primary key,
    code int,
    host_name varchar,
    joinable boolean 
);

insert into games (code, host_name, joinable)
values (1234, 'Tate', true),
( 5678, 'Mark', false);

select * from questions;
select * from games