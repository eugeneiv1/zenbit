import { UserEntity } from '../../../database/entities/user.entity';
import { TokenResponseDto } from '../dto/response/token.response.dto';

export class AuthMapper {
  public static toAuthResponse(entity: UserEntity, tokens: TokenResponseDto) {
    return {
      user: entity.id,
      email: entity.email,
      tokens,
    };
  }
}
