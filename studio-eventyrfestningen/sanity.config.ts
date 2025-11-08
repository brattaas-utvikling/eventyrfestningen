// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
// import { SchemaTypeDefinition } from 'sanity'

export default defineConfig({
  name: 'studio-eventyrfestningen',
  title: 'Eventyrfestningen',

  // bruk ID-en du fikk av Sanity da du opprettet prosjektet
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  
  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
