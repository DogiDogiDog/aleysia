Create table Agent(
id INT PRIMARY KEY IDENTITY(1,1), 
name VARCHAR(255) NOT NULL,
first_name VARCHAR(255) NOT NULL,
objectif INTEGER)


CREATE Table Consultant(
id INT PRIMARY KEY IDENTITY(1,1), 
name VARCHAR(255) NOT NULL,
first_name VARCHAR(255) NOT NULL,
price INT, 
cost INT,
charges INT,
agent INT NOT NULL,
FOREIGN KEY(agent) REFERENCES agent(id))

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


INSERT INTO Consultant VALUES 
('Alfred', 'robert', 1000,500,20,1),
('Jacques', 'Pierre', 2000,500,10,1)
('Jean', 'Pierre', 2000,500,10,2)

INSERT INTO AGENT(name, first_name, objectif) VALUES
('thirry','lemarchand',34000),
('pierre','tutu',35000),
('megane','toto',20000),
('marie','dupont',35000),
('stephane','dupont',40000)

drop table director, responsable, agent, consultant


INSERT INTO Responsable 
VALUES(2,1),(4,3)

INSERT INTO Director 
VALUES(5,4),(5,2)
