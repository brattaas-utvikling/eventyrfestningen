// schemas/index.ts
import { milestone } from "./documents/milestone";
import { performanceDoc } from "./documents/performance";
import { person } from "./documents/person";
import { post } from "./documents/post";
import { show } from "./documents/show";
import { sponsor } from "./documents/sponsor";
import { seo } from "./object/seo";


export const schemaTypes = [
  // Documents
  show,
  performanceDoc,
  person,
  milestone,
  post,
  sponsor,
  // Objects
  seo
]