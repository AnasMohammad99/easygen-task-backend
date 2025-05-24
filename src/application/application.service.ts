import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { handleError } from 'src/exceptions/errors-handler';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';
import { Status } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private database: DatabaseService) {}

  async getMyApplications(request) {
    try {
      const applications = await this.database.application.findMany({
        where: {
          user_id: request.user.user_id,
        },
      });
      return applications;
    } catch (error) {
      handleError(error);
    }
  }
  //----------------------------------------------------------------
  async getApplicationList(query: {
    limit: string;
    page: string;
    application_status?: string;
  }) {
    try {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const skip = (page - 1) * limit;

      const filters: any = {};

      // Validate status against the Status enum
      if (
        query.application_status &&
        Object.values(Status).includes(query.application_status as Status)
      ) {
        filters.status = query.application_status as Status;
      }

      const applications = await this.database.application.findMany({
        where: filters,
        // skip,
        // take: limit,
      });

      return applications;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addApplication(dto: CreateApplicationDto, request) {
    const application = await this.database.application.create({
      data: { ...dto, user_id: request.user.user_id },
    });
    try {
      return { message: 'application added', application: application };
    } catch (error) {
      handleError(error);
    }
  }
  //-------------------------------------
  async getApplicationById(application_id: number, request) {
    try {
      const application = await this.database.application.findUnique({
        where: {
          id: application_id,
        },
      });
      if (
        application.user_id !== request.user.user_id &&
        request.user.role !== 'ADMIN'
      ) {
        throw new HttpException(
          'you can not access others application',
          HttpStatus.BAD_REQUEST,
        );
      }
      return { data: application };
    } catch (error) {
      handleError(error, 'application_id is missing or must be an integer');
    }
  }
  //--------------------------------------
  async updateApplication(
    dto: UpdateApplicationDto,
    application_id: number,
    request,
  ) {
    try {
      const application = await this.database.application.findUnique({
        where: {
          id: application_id,
        },
      });
      if (
        application.user_id !== request.user.user_id &&
        request.user.role !== 'ADMIN'
      ) {
        throw new HttpException(
          'you can not update others application',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updatedapplication = await this.database.application.update({
        where: {
          id: application_id,
        },
        data: {
          ...dto,
        },
      });
      return { message: 'application updated', data: updatedapplication };
    } catch (error) {
      handleError(error, 'application_id is missing or must be an integer');
    }
  }
  //------------------------------------------
  async deleteApplicationById(application_id: number, request) {
    try {
      const application = await this.database.application.findUnique({
        where: {
          id: application_id,
        },
      });
      if (
        application.user_id !== request.user.user_id &&
        request.user.role !== 'ADMIN'
      ) {
        throw new HttpException(
          'you can not delete others application',
          HttpStatus.BAD_REQUEST,
        );
      }
      const deletedApplication = await this.database.application.delete({
        where: {
          id: application_id,
        },
      });
      return { message: 'application deleted', data: deletedApplication };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //------------------------------------------
  async deleteAllApplications() {
    try {
      const deletedApplications = await this.database.application.deleteMany(
        {},
      );
      return { message: 'applications deleted', data: deletedApplications };
    } catch (error) {
      handleError(error, 'error...');
    }
  }
}
