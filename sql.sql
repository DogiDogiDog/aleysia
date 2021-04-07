
Create table Agent(
id INT IDENTITY(1,1), 
name VARCHAR(255) NOT NULL,
first_name VARCHAR(255) NOT NULL,
objectif INTEGER,
PRIMARY KEY(id))

CREATE Table Consultant(
id INT IDENTITY(1,1), 
name VARCHAR(255) NOT NULL,
first_name VARCHAR(255) NOT NULL,
price INT, 
cost INT,
charges INT,
responsable int,
PRIMARY KEY(id),
FOREIGN KEY(responsable) REFERENCES agent(id))

CREATE table Calendar(
consultant int PRIMARY KEY  not null,
annee int NOT NULL,
janvier int,
fevrier int,
mars int,
avril int,
mai int,
juin int,
juillet int,
aout int,
septembre int,
octobre int,
novembre int, 
decembre int,
FOREIGN KEY(consultant) REFERENCES consultant(id))


INSERT INTO AGENT(name, first_name, objectif) VALUES
('thirry','lemarchand',34000),
('pierre','tutu',35000),
('megane','toto',20000),
('marie','dupont',35000),
('stephane','dupont',40000)

INSERT INTO Consultant VALUES 
('Alfred', 'robert', 1000,500,20,1),
('Jacques', 'Pierre', 2000,500,10,1),
('Jean', 'Pierre', 2000,500,10,2)

insert into calendar(consultant, annee) values 
((select consultant.id from consultant where consultant.name='Alfred'),2020)
insert into calendar(consultant, annee) values (1,2021)

select * from consultant, calendar
where consultant.name='Alfred' 


CREATE TABLE Credentials(
	email varchar(255),
	psw varchar(255),
	token varchar(255)
)


TRUNCATE TABLE Credentials
----------------------------------------------------------

drop table calendar,consultant,agent

CREATE table Responsable(
relation int PRIMARY KEY IDENTITY(1,1),
id INT NOT NULL,
agent INT NOT NULL,
FOREIGN KEY(id) REFERENCES Agent(id),
FOREIGN KEY(agent) REFERENCES Agent(id))

CREATE table Director(
relation int PRIMARY KEY IDENTITY(1,1),
id INT NOT NULL,
responsable INT NOT NULL,
FOREIGN KEY(id) REFERENCES Agent(id),
FOREIGN KEY(responsable) REFERENCES Agent(id))



INSERT INTO Responsable 
VALUES(2,1),(4,3)


INSERT INTO Director 
VALUES(5,4),(5,2)


---------------------------------------------