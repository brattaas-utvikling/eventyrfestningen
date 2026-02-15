// schemas/index.ts
import { milestone } from "./documents/milestone";
import newsletter from "./documents/newsletter";
import { organization } from "./documents/organization";
import { performanceDoc } from "./documents/performance";
import { person } from "./documents/person";
import { post } from "./documents/post";
import { show } from "./documents/show";
import { siteSettings } from "./documents/siteSettings";
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
  siteSettings,
  organization,
  newsletter,
  // Objects
  seo
]