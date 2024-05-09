import { z } from "zod";

export const filterParams  = z.object({
    catagories : z.string(),
    season : z.string(),
    bathrooms : z.string(),
    bedrooms : z.string()
});

