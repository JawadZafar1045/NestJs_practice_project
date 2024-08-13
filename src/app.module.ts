import { Module } from '@nestjs/common';
import { HostelPostModule } from './hostel-post/hostel-post.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [HostelPostModule, UserModule,AuthModule, MongooseModule.forRoot('mongodb://localhost/Experiment'),],
  controllers: [],
  providers: [],
})
export class AppModule {}