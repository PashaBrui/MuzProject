import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import * as path from 'path'
import {ServeStaticModule} from "@nestjs/serve-static";
import { albumModule } from "./album/album.module";

@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        
        MongooseModule.forRoot('mongodb://root:example@mongo:27017/'),
        TrackModule,
        albumModule,
        FileModule
    ]
})
export class AppModule {}
