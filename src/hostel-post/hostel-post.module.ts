import { Module } from '@nestjs/common';
import { HostelPostService } from './hostel-post.service';
import { HostelPostController } from './hostel-post.controller';
import { hostelPost,HostelPostSchema } from './hostelPost.schema'; 
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: hostelPost.name, schema: HostelPostSchema }]),
  ],
  controllers: [HostelPostController],
  providers: [HostelPostService],
})
export class HostelPostModule {}
