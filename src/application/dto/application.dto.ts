import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum Status {
  PENDING,
  REJECTED,
  CANCELLED,
  ACCEPTED,
}
export class CreateApplicationDto {
  @ApiProperty({ description: 'Name of the job', example: 'Job Name' })
  @IsString()
  @IsNotEmpty()
  job_name: string;
  @ApiProperty({
    description: 'Description of the Job',
    example: 'Job Description',
  })
  @IsString()
  @IsNotEmpty()
  job_description: string;
  @IsNotEmpty()
  @IsEnum(Status)
  status: any = 'PENDING';
}
export class UpdateApplicationDto {
  @ApiProperty({ description: 'Name of the job', example: 'Job Name' })
  @IsString()
  @IsOptional()
  job_name: string;
  @ApiProperty({
    description: 'Description of the Job',
    example: 'Job Description',
  })
  @IsString()
  @IsOptional()
  job_description: string;
  @IsOptional()
  @IsEnum(Status)
  status: any;
}
