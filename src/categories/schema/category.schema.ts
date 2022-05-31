import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { SubCategoryType } from "src/types/SubCategoryType";



@Schema()
export class Category extends Document {
    @Prop()
    title: string;

    @Prop()
    subCategories: SubCategoryType[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);