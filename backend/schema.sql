create database if not exists clinic;
use clinic;
create table if not exists doctors(
  id int auto_increment primary key,
  name varchar(100) not null,
  specialty varchar(100) not null
);
create table if not exists patients(
  id int auto_increment primary key,
  name varchar(100) not null,
  birthdate date not null
);
create table if not exists appointments(
  id int auto_increment primary key,
  patient_id int not null,
  doctor_id int not null,
  time datetime not null,
  reason text not null,
  foreign key(patient_id) references patients(id),
  foreign key(doctor_id) references doctors(id)
);
insert into doctors(name,specialty) values ('Д-р Иван Иванов','Кардиология');
insert into patients(name,birthdate) values ('Мария Петрова','1990-05-12');
insert into appointments(patient_id,doctor_id,time,reason) values (1,1,now(),'Контролен преглед');
