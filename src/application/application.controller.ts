import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtAuthGuard';
import { RoleGuard } from 'src/roleAuthGuard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';

@UseGuards(JwtAuthGuard)
@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  //get all applications
  @Get('/myapplications')
  @ApiOperation({ summary: 'Get all user applications' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Applications retrieved successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getMyApplications(@Req() request) {
    return this.applicationService.getMyApplications(request);
  }
  //get applications list based on queries  only admins
  @UseGuards(RoleGuard)
  @Get('/list')
  @ApiOperation({ summary: 'Get application list' })
  @ApiBearerAuth()
  // @ApiQuery({
  //   name: 'limit',
  //   description: 'Limit number of applications',
  //   required: false,
  // })
  // @ApiQuery({ name: 'page', description: 'Page number', required: false })
  @ApiQuery({
    name: 'application_status',
    description: 'status of application',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Application list retrieved successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getApplicationList(
    @Query() query: { limit: string; page: string; application_status: string },
  ) {
    return this.applicationService.getApplicationList(query);
  }
  //get application by id
  // @UseGuards(RoleGuard)
  @Get('/:application_id')
  @ApiOperation({ summary: 'Get application by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'application_id', description: 'ID of the application' })
  @ApiResponse({
    status: 200,
    description: 'application retrieved successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getApplicationById(
    @Param('application_id') application_id: string,
    @Req() request,
  ) {
    return this.applicationService.getApplicationById(+application_id, request);
  }
  //add application
  @Post()
  @ApiOperation({ summary: 'user Add a new application' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateApplicationDto })
  @ApiResponse({ status: 201, description: 'application added successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  addApplication(@Body() dto: CreateApplicationDto, @Req() request) {
    return this.applicationService.addApplication(dto, request);
  }
  //update application by id
  @Patch('/:application_id')
  @ApiOperation({ summary: 'user Update his application information' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateApplicationDto })
  @ApiParam({ name: 'application_id', description: 'ID of the application' })
  @ApiResponse({ status: 200, description: 'application updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    description: 'application ID is missing or must be an integer',
  })
  updateApplication(
    @Body() dto: UpdateApplicationDto,
    @Param('application_id') application_id: string,
    @Req() request,
  ) {
    return this.applicationService.updateApplication(
      dto,
      +application_id,
      request,
    );
  }
  //delete application by id
  @Delete('/:application_id')
  @ApiOperation({ summary: 'user Delete his application by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'application_id', description: 'ID of the application' })
  @ApiResponse({ status: 200, description: 'application deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    description: 'application ID is missing or must be an integer',
  })
  deleteApplicationById(
    @Param('application_id') application_id: string,
    @Req() request,
  ) {
    return this.applicationService.deleteApplicationById(
      +application_id,
      request,
    );
  }
  //delete all applications
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'admin Delete all applications' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'All applications deleted successfully',
  })
  @Delete()
  deleteAllApplications() {
    return this.applicationService.deleteAllApplications();
  }
}
