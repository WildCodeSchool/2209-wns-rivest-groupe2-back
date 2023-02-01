import { InputType, Field } from "type-graphql";
import { CreatePoiInput } from "./createPoiInput";

@InputType({ description: "Update Poi data" })
export class UpdatePoiInput extends CreatePoiInput {
  @Field()
  id: number;
}
