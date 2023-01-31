import { applyDecorators, UseGuards } from '@nestjs/common';
import { Public } from '../public/public.auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';

export const LocalAuth = () =>
  applyDecorators(Public(), UseGuards(LocalAuthGuard));
