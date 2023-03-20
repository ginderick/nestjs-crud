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
  constructor(private schema: ZodTypeAny) {
    console.log(schema);
  }

  transform(value: any) {
    console.log(value);
    console.log(typeof value);
    const result = this.schema.safeParse(value);
    console.log(result);
    if (result.success === false) {
      throw new BadRequestException('Validation Failed', `${result.error}`);
    }
    return value;
  }
}

@Injectable()
export class TagValidationPipe implements PipeTransform {
  transform(value: any) {
    const tagList = ['PARTS', 'ACCESSORIES'];
    if (tagList.includes(value)) {
      return value;
    }
    throw new BadRequestException('Validation Failed');
  }
}

@Injectable()
export class TicketStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    const statusList = ['NEW', 'IN PROGRESS'];
    if (statusList.includes(value)) {
      return value;
    }
    throw new BadRequestException('Validation Failed');
  }
}
