
import { SetMetadata } from '@nestjs/common';
import { IS_NO_AUTH_KEY } from '../constrantes';

export const NoAuth = () => SetMetadata(IS_NO_AUTH_KEY, true);
