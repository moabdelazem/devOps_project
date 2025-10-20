-- Create the items table
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on the name column for faster searches
CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);

-- Insert some sample data (optional)
INSERT INTO items (name) VALUES 
    ('Sample Item 1'),
    ('Sample Item 2'),
    ('Sample Item 3')
ON CONFLICT DO NOTHING;
