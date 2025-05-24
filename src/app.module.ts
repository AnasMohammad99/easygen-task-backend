import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './jwtAuthGuard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'outlook',
        auth: {
          user: process.env.HOST_EMAIL,
          pass: process.env.HOST_EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [JwtAuthGuard, AppService],
})
export class AppModule {}
