import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/jwtAuthGuard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { RoleGuard } from 'src/roleAuthGuard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUDto } from 'src/auth/dtos/auth.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  //get all users
  @UseGuards(RoleGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Retrieved all users successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  //create user
  @UseGuards(RoleGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new user By Admin' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateUDto })
  @ApiResponse({ status: 201, description: 'User added successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'User already exists' })
  addUser(@Body() dto: CreateUserDto, @Req() req) {
    return this.userService.addUser(dto, req);
  }
  //get my account
  @Get('/myuser')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiBearerAuth()
  // @ApiParam({ name: 'user_id', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'Retrieved user successfully' })
  @ApiBadRequestResponse({
    description: 'User ID is missing or must be an integer',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getMyUser(@Req() req) {
    return this.userService.getMyUser(req);
  }
  //get user by id
  @UseGuards(RoleGuard)
  @Get('/:user_id')
  @ApiOperation({ summary: 'Get user by ID by admin only' })
  @ApiBearerAuth()
  @ApiParam({ name: 'user_id', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'Retrieved user successfully' })
  @ApiBadRequestResponse({
    description: 'User ID is missing or must be an integer',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getUserById(@Param('user_id') user_id: string) {
    return this.userService.getUserById(+user_id);
  }

  //update my account
  @Patch('/myuser')
  @ApiOperation({ summary: 'update my account' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'update user successfully' })
  @ApiBadRequestResponse({
    description: 'error...',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  updateMyUser(@Body() dto: UpdateUserDto, @Req() req) {
    console.log('running...');

    return this.userService.updateMyUser(dto, req);
  }
  //update user by id
  @UseGuards(RoleGuard)
  @Patch('/:user_id')
  @ApiOperation({ summary: 'Update user information by admin only' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'user_id', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    description: 'User ID is missing or must be an integer',
  })
  updateUserById(
    @Body() dto: UpdateUserDto,
    @Param('user_id') user_id: string,
  ) {
    return this.userService.updateUserById(dto, +user_id);
  }
  //delete my account
  @Delete('/myuser')
  @ApiOperation({ summary: 'delete my account' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'delete user successfully' })
  @ApiBadRequestResponse({
    description: 'error...',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  deleteMyUser(@Req() req) {
    return this.userService.deleteMyUser(req);
  }
  //delete user by id
  @UseGuards(RoleGuard)
  @Delete('/:user_id')
  @ApiOperation({ summary: 'Delete user by ID by admin only' })
  @ApiBearerAuth()
  @ApiParam({ name: 'user_id', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    description: 'User ID is missing or must be an integer',
  })
  deleteUserById(@Param('user_id') user_id: string) {
    return this.userService.deleteUserById(+user_id);
  }
}
