# To do webapp

This is a basic todo app

## Requirements

- PHP 8.2.7
- npm 9.5.1 (You can also use pnpm 8.5.1)
- Node.js 18.16.0
- SQLite 3

## Installation

1. Clone the repository:
   `git clone https://github.com/Faustrox/to-do-test.git`

2. Setup the environment:

- Create a `.env` file in the project root directory.
- Add the following environment variables to the `.env` file:

  ```
  APP_KEY=
  APP_NAME=Laravel
  APP_ENV=local
  APP_DEBUG=true
  APP_URL=http://localhost

  LOG_CHANNEL=stack
  LOG_DEPRECATIONS_CHANNEL=null
  LOG_LEVEL=debug

  DB_CONNECTION=sqlite
  DB_HOST=127.0.0.1
  DB_PORT=3306
  ```

- There is a `.env.example` that you can copy and paste it to `.env`

3. Generate an application key:
   php artisan key:generate

4. Install dependencies:

- Run the following command to install PHP dependencies:
  ```
  composer install
  ```
- Run the following command to install JavaScript dependencies:
  ```
  npm install
  # or
  yarn install
  # or
  pnpm install
  ```

5. Create the SQLite database:

- Create a `database.sqlite` file in the `database` folder.
- Run the database migrations:
  ```
  php artisan migrate
  ```

6. Run the application:

- Start the development server:
  ```
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  ```
- Open your web browser and visit `http://localhost:8000`.

## Usage

Provide instructions on how to use your application and any additional information that may be helpful.
