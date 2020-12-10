create schema if not exists app_public;
create table if not exists app_public.foo (
 id serial primary key,
 title text not null
);





