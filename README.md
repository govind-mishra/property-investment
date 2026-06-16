# Property Investment Feature

This initial version uses a JSON file as the database. The backend follows a repository layer pattern, allowing the data storage mechanism to be replaced in the future with another database system, such as MongoDB.

## Run Locally

Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Start backend:

```bash
cd backend
npm run dev
```

Start frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open:

```
URL shown after running npm run dev
```

## API

```text
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PUT    /api/properties/:id
DELETE /api/properties/:id
```

## Architecture

```text
frontend React UI
  -> frontend/src/api/propertyApi.ts
  -> backend Express routes
    -> controller
    -> service
    -> JSON repository
    -> backend/data/properties.json
```
