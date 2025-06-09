import { OmitType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UserResponseDto extends OmitType(User, ['password'] as const) {
 
}