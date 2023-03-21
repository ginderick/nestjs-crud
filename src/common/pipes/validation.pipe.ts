import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { ZodTypeAny } from 'zod';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation Failed', `${error}`);
    }
    return value;
  }
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodTypeAny) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (result.success === false) {
      throw new BadRequestException('Validation Failed', `${result.error}`);
    }
    return value;
  }
}

@Injectable()
export class TagValidationPipe implements PipeTransform {
  transform(value: string | undefined) {
    const tagList = ['PARTS', 'ACCESSORIES'];

    if (value === undefined) {
      return;
    }

    if (tagList.includes(value)) {
      return value;
    }
    throw new BadRequestException('Validation Failed');
  }
}

@Injectable()
export class TicketStatusValidationPipe implements PipeTransform {
  transform(value: string | undefined) {
    const statusList = ['NEW', 'IN PROGRESS', 'DONE'];

    if (value === undefined) {
      return;
    }

    if (statusList.includes(value)) {
      return value;
    }
    throw new BadRequestException('Validation Failed');
  }
}
