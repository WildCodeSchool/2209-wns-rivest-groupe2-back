import { PointOfInterest } from "../entities/pointOfInterest"

export interface UserRate  {
    rate: number
    createDate: String
    updateDate: String
  }
  
  export interface UserComment {
    id: number
    text: String
    createDate: String
    updateDate: String
  }

export interface POIWithUser {
   pois: PointOfInterest[]
   userRate?: number
   userComment?: string
   userFavorite?: boolean
  }