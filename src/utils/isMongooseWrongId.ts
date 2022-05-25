import { BadRequestException } from "@nestjs/common";
import mongoose from "mongoose";


export const isMongooseWrongId =(id: string) =>{
    const isCorrectId = mongoose.isValidObjectId(id);

        if(!isCorrectId){
          throw new BadRequestException('Please enter valid ID');
        }
}