import { InputType, Field } from "type-graphql";

@InputType()
export class EmailData {
    @Field()
    to: string;

    @Field()
    subject: string;

    @Field()
    message: string;
}