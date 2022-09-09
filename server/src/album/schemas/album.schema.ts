import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose'

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop()
    name: string;

    @Prop()
    artist: string;


    @Prop()
    year: number;

    @Prop()
    picture: string;

    @Prop()
    audioList: [string];

   
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
