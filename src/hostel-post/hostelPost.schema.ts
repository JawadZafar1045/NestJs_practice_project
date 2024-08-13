import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type hostelDocument = HydratedDocument<hostelPost>

@Schema()
export class hostelPost {
 @Prop({required : true})
 name : string;
@Prop()
location : string;
@Prop()
description : string;
@Prop()
contact : string;
@Prop()
image: string;
}


export const HostelPostSchema = SchemaFactory.createForClass(hostelPost);