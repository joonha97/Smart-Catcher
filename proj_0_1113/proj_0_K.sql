create database proj_0;
use proj_0;

create table K(
	id int not null auto_increment primary key,
	gocome int,
	time timestamp default current_timestamp
);

CREATE USER 'me'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON proj_0.* TO 'me'@'localhost';
FLUSH PRIVILEGES;