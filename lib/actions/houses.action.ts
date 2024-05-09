"use server";


import House from "@/database/houses.model";
import { connectToDatabase } from "../mongoose";


// Interface defining the structure of parameters expected by the getHouses function
interface GetHousesParams {
  page?: number;
  pageSize?: number; 
  searchQuery?: string; 
  searchParams?: {
    catagories?: string[]; 
    bedrooms?: string; 
    bathrooms?: string; 
    season?: string;
  };
}


export async function getHouses(params: GetHousesParams) {
 
  connectToDatabase();

  // Destructuring parameters
  const { searchQuery, searchParams } = params;
 
  // Destructuring searchParams object
  const catagories = searchParams?.catagories;
  const bedrooms = searchParams?.bedrooms;
  const bathrooms = searchParams?.bathrooms;
  const season = searchParams?.season;

  try {
    // Checking if searchParams object exists
    if(searchParams) {
      let pipeline: any[] = [];
      
      
      console.log('pipeline',pipeline);

      // Adding text search using $match stage if searchQuery exists
      if (searchQuery) {
        pipeline.push({ $match: { name: { $regex: new RegExp(searchQuery, "i") } } });
      }

      // Adding $match stage for category if categories exist
      if(catagories){
        pipeline.push({ $match : { category:  catagories }})
      }

      // Adding $match stage for bedrooms if bedrooms exist
      if(bedrooms){
        pipeline.push({ $match : { bedrooms:parseInt(bedrooms)  }})
      }
   
      // Adding $match stage for bathrooms if bathrooms exist
      if(bathrooms){
        pipeline.push({ $match : { bathrooms:  parseInt(bathrooms) }})
      }

      // Adding $match stage for season if season exists
      if(season){
        pipeline.push({ $match : { season:  season }})
      }

      // Checking if pipeline has stages
      if(pipeline.length > 0) {
        console.log('pipeline',pipeline);
      
        // Executing aggregate pipeline and returning houses
        const houses = await House.aggregate(pipeline);
        return { houses };
      }
    }

    // If no search parameters, return all houses
    const houses = await House.find();
    return { houses };

  } catch (error) {
    // Logging and re-throwing any errors
    console.log(error);
    throw error;
  }
}
