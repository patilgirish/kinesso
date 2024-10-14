import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The name of the user',
  })
  readonly name?: string;

  @ApiPropertyOptional({
    example: 'john@example.com',
    description: 'The email of the user',
  })
  readonly email?: string;

  @ApiPropertyOptional({
    example: '1234567890',
    description: 'The phone number of the user',
  })
  readonly phone?: string;
}
