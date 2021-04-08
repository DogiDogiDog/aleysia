
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
janvier int default 0,
fevrier int default 0,
mars int default 0,
avril int default 0,
mai int default 0,
juin int default 0,
juillet int default 0,
aout int default 0,
septembre int default 0,
octobre int default 0,
novembre int default 0,
decembre int default 0,
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

 CREATE TRIGGER calendar_consultant
 ON Consultant
 AFTER INSERT
 AS
 INSERT INTO Calendar(consultant, annee)
 VALUES((SELECT id FROM CONSULTANT
 WHERE id=(SELECT id from inserted)), YEAR(GETDATE()));


UPDATE CALENDAR  
SET janvier=12
WHERE CALENDAR.consultant=1
AND CALENDAR.annee=2021


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