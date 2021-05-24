CREATE table Calendar(
employe_id int PRIMARY KEY not null,
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
decembre int default 0)

CREATE TABLE Credentials(
	email varchar(255) PRIMARY KEY,
	psw varchar(255),
	token varchar(255)
)

Create table Agent(
id INT IDENTITY(1,1), 
name VARCHAR(255) NOT NULL,
first_name VARCHAR(255) NOT NULL,
email varchar(255),
calendar INT,
PRIMARY KEY(id),
FOREIGN KEY(email) REFERENCES Credentials(email))

CREATE Table Consultant(
id INT IDENTITY(1,1), 
name VARCHAR(255) NOT NULL,
first_name VARCHAR(255) NOT NULL,
company varchar(255),
price INT, 
cost INT,
charges INT,
responsable int,
calendar int,
PRIMARY KEY(id),
FOREIGN KEY(responsable) REFERENCES agent(id))


CREATE TRIGGER calendar_consultant
 ON Consultant
 AFTER INSERT
 AS
 INSERT INTO Calendar(employe_id, annee)
 VALUES((SELECT id FROM CONSULTANT
 WHERE id=(SELECT id from inserted)), YEAR(GETDATE()));

CREATE TRIGGER calendar_agent
 ON Agent
 AFTER INSERT
 AS
 INSERT INTO Calendar(employe_id, annee)
 VALUES((SELECT id FROM AGENT
 WHERE id=(SELECT id from inserted)), YEAR(GETDATE()));


 CREATE TRIGGER insert_agent
 ON Credentials
 AFTER INSERT
 AS
 INSERT INTO Agent(name, first_name, email)
 VALUES('sdsds','ssdsds',(SELECT email FROM Credentials as C WHERE C.email=(SELECT email from inserted)))

INSERT INTO CREDENTIALS(email, psw)
VALUES
('thirry.lemarchand@aaaleysdia.com', 'www'),
('william.zaborowski@aleysia.com','www')


INSERT INTO AGENT(name, first_name, email) VALUES
('thirry','lemarchand','thirry.lemarchand@aleysia.com')
INSERT INTO AGENT(name, first_name, email, objectif) VALUES
('pierre','tutu','william.zaborowski@aleysia.com',35000)
INSERT INTO AGENT(name, first_name, email, objectif) VALUES
('megane','toto','thirry.lemarchand@aleysia.com',20000)
INSERT INTO AGENT(name, first_name, email, objectif) VALUES
('marie','dupont','thirry.lemarchand@aleysia.com',35000)
INSERT INTO AGENT(name, first_name, email, objectif) VALUES
('stephane','dupont','thirry.lemarchand@aleysia.com', 40000)

INSERT INTO Consultant(name, first_name, company, price, cost, charges, responsable)
VALUES('gerard', 'lebon','flowbird', 200,100,10,6)


select * from consultant, calendar
where consultant.name='Alfred' 



INSERT INTO Agent(name, first_name, email) VALUES
('thirry','lemarchand','thirry.lemarchand@aleysia.com'),
('pierre','tutu','thirry.lemarchand@aleysia.com'),
('megane','toto','thirry.lemarchand@aleysia.com'),
('marie','dupont','thirry.lemarchand@aleysia.com'),
('stephane','dupont','thirry.lemarchand@aleysia.com')

 

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