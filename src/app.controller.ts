import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './jwtAuthGuard';
import { RoleGuard } from './roleAuthGuard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Returns a greeting message' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  getHello(): string {
    return this.appService.getHello();
  }
}
