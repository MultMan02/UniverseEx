# UniverseEx • Mars Rover Gallery

A Next.js 15 (App Router) implementation of the **Front-end Challenge**:

- Display Mars Rover images from the NASA API
- Include **Header**, **Content**, **Footer**
- For each photo, show **Earth date**, **Rover name**, **Camera name**
- Provide **filters** (Rover, Camera, Earth date) and a **search box**
- Include **pagination**

## Getting started

1. Install dependencies
   ```bash
   npm i
   # or: pnpm i / yarn
   ```

2. Configure environment
   ```bash
   cp .env.example .env.local
   # then put your NASA API key
   ```

3. Run
   ```bash
   npm run dev
   ```

Open http://localhost:3000

## Notes

- Rovers supported: Curiosity, Opportunity, Spirit (per the public API).
- Camera list adapts based on selected rover.
- Pagination is implemented via the `page` query param.
- The optional search box performs a simple text filter on the results (rover/camera names).
