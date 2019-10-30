insert into games (code, host_name, joinable)
values ($1, null, true)
returning *;