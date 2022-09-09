import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Album, AlbumDocument} from "./schemas/album.schema";
import {Model, ObjectId} from "mongoose";

import {CreatealbumDto} from "./dto/create-album.dto";

import {FileService, FileType} from "../file/file.service";


@Injectable()
export class AlbumService {

    constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
                
                private fileService: FileService) {}

    async create(dto: CreatealbumDto, picture): Promise<Album> {
        
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const album = await this.albumModel.create({...dto,  picture: picturePath})
        return album;
    }

    async getAll(count = 10, offset = 0): Promise<Album[]> {
        const albums = await this.albumModel.find().skip(Number(offset)).limit(Number(count));
        return albums;
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await this.albumModel.findById(id).populate('comments');
        return album;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const album = await this.albumModel.findByIdAndDelete(id);
        return album._id
    }




    async listen(id: ObjectId) {
        const album = await this.albumModel.findById(id);
    
        album.save()
    }

    async search(query: string): Promise<Album[]> {
        const albums = await this.albumModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
        return albums;
    }
}
