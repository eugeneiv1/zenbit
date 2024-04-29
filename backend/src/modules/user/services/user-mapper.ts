import { UserEntity } from '../../../database/entities/user.entity';

export class UserMapper {
  public static userResponse(entity: UserEntity) {
    return {
      userId: entity.id,
      email: entity.email,
    };
  }
}
