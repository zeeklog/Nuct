import { Body, Controller, Post } from '@nestjs/common'

import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { MailerService } from '~/shared/mailer/mailer.service'

import { EmailSendDto } from './email.dto'

export const permissions = definePermission('tools:email', {
  SEND: 'send',
} as const)

@ApiTags('System - 邮箱模块')
@ApiSecurityAuth()
@Controller('email')
export class EmailController {
  constructor(private emailService: MailerService) {}

  @ApiOperation({ summary: '发送邮件' })
  @Perm(permissions.SEND)
  @Post('send')
  async send(@Body() dto: EmailSendDto): Promise<void> {
    const { to, subject, content } = dto
    await this.emailService.send(to, subject, content, 'html')
  }
}
