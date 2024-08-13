import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HostelPostService } from './hostel-post.service';
import { CreateHostelPostDto } from './dto/create-hostel-post.dto';
import { Response } from 'express';
import { File } from 'multer';


@Controller('hostel-post')
export class HostelPostController {
  constructor(private readonly hostelPostService: HostelPostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createHostelPostDto: CreateHostelPostDto,
    @UploadedFile() file: File,
    @Res() res: Response,
  ) {
    try {
      const hostelPost = await this.hostelPostService.create(
        createHostelPostDto,
        file,
      );
      return res.status(201).json(hostelPost);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error creating hostel post', error: error.message });
    }
  }

  @Get()
  async findAll() {
    return this.hostelPostService.findAll();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string, @Res() res: Response) {
    try {
      const hostelpost = await this.hostelPostService.findOne(id);
      if (!hostelpost) {
        res.status(400).json('No hostel find by this id');
      }
      res.status(200).json(hostelpost);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.hostelPostService.remove(id);
      return res.status(200).json('Hostel Deleted Successfully');
    } catch (error) {
      console.log(error);
    }
  }
}
