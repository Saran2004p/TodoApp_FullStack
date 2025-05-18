create database todo_list;
use todo_list;

create table categories (
    id int primary key auto_increment,
    name VARCHAR(50) NOT NULL,
    suggestion TEXT
);

INSERT INTO categories (name, suggestion) VALUES 
    ('Work', 'Finish project, check emails, schedule meetings'), 
    ('Personal', 'Call family, relax, read a book'), 
    ('Shopping', 'Buy groceries, order online, make a list'), 
    ('Study', 'Read notes, prepare for exams, watch tutorials'), 
    ('Fitness', 'Go to gym, do yoga, walk 10,000 steps'), 
    ('Health', 'Take vitamins, drink water, get enough sleep'), 
    ('Finance', 'Pay bills, review budget, save money'), 
    ('Travel', 'Book tickets, plan itinerary, pack bags'), 
    ('Household', 'Clean room, do laundry, fix appliances'), 
    ('Others', 'Miscellaneous tasks, ideas, or experiments');

CREATE TABLE IF NOT EXISTS todos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task TEXT NOT NULL,
    category_id INT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

ALTER TABLE todos ADD COLUMN completed BOOLEAN DEFAULT FALSE;