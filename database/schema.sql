CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(120) UNIQUE NOT NULL,
    category VARCHAR(40) NOT NULL,
    title_fr VARCHAR(180) NOT NULL,
    title_en VARCHAR(180) NOT NULL,
    client_name VARCHAR(120) NOT NULL,
    summary_fr TEXT NOT NULL,
    summary_en TEXT NOT NULL,
    tech_stack VARCHAR(255) NOT NULL,
    repo_url TEXT,
    featured BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS photo_posts (
    id SERIAL PRIMARY KEY,
    ig_media_id VARCHAR(100) UNIQUE NOT NULL,
    caption_fr TEXT,
    caption_en TEXT,
    image_url TEXT NOT NULL,
    permalink TEXT NOT NULL,
    film_profile VARCHAR(80) DEFAULT '1990s / CONTRAST',
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(40) NOT NULL,
    sender_name VARCHAR(120) NOT NULL,
    sender_email VARCHAR(180) NOT NULL,
    message_body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);