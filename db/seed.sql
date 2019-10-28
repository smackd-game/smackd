create table questions (
    question_id serial primary key,
    text varchar,
    answer varchar
);

insert into questions (text, answer)
values ('What is the sexiest and least sexy name?', ''),
( 'What is invisible but you wish people could see?', '');