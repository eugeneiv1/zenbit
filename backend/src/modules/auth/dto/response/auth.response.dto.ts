import { TokenResponseDto } from './token.response.dto';

export class AuthResponseDto {
  tokens: TokenResponseDto;
  user: string;
  email: string;
}
