// src/hostel-post/hostel-post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hostelPost, hostelDocument } from './hostelPost.schema';
import { CreateHostelPostDto } from './dto/create-hostel-post.dto';
import { Readable } from 'stream';
import { File } from 'multer';
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary

@Injectable()
export class HostelPostService {
  constructor(@InjectModel(hostelPost.name) private readonly hostelModel: Model<hostelDocument>) {
   
    cloudinary.config({
      cloud_name: "dzmm6qvmz",
      api_key: "863849527542839",
      api_secret:  "YGHtK1K6WiwSzZI4n7frL1JLYRg",
    });

      
    // cloudinary.config({
    //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //   api_key:  process.env.CLOUDINARY_API_KEY,
    //   api_secret:  process.env.CLOUDINARY_API_SECRET,
    // });
  }

  async create(createHostelPostDto: CreateHostelPostDto, file: File): Promise<hostelPost> {
    let image: string | undefined;

    if (file) {
      try {
        const uploadResult = await this.uploadImage(file);
        image= uploadResult.secure_url;
      } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
      }
    }

    const hostelPost = new this.hostelModel({
      ...createHostelPostDto,
      image, 
    });

    return hostelPost.save();
  }

  private async uploadImage(file: File): Promise<any> {
    const stream = Readable.from(file.buffer);
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });

      stream.pipe(uploadStream);
    });
  }

  async findAll(): Promise<hostelPost[]> {
    return this.hostelModel.find();
  }

  async findOne(id: string): Promise<hostelPost> {
    return this.hostelModel.findById(id).exec();
  }

  async remove(id: string): Promise<any> {
    return this.hostelModel.findByIdAndDelete(id).exec();
  }
}
