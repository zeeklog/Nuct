import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { FastifyRequest } from 'fastify'

import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'
import { AuthService } from '~/modules/auth/auth.service'

import { ALLOW_ANON_KEY, PERMISSION_KEY, PUBLIC_KEY, Roles } from '../auth.constant'

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic)
      return true

    const request = context.switchToHttp().getRequest<FastifyRequest>()

    const { user } = request
    if (!user)
      throw new BusinessException(ErrorEnum.INVALID_LOGIN)

    // allowAnon 是需要登录后可访问(无需权限), Public 则是无需登录也可访问.
    const allowAnon = this.reflector.get<boolean>(
      ALLOW_ANON_KEY,
      context.getHandler(),
    )
    if (allowAnon)
      return true

    const payloadPermission = this.reflector.getAllAndOverride<
      string | string[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()])

    // 控制器没有设置接口权限，则默认通过
    if (!payloadPermission)
      return true

    // 管理员放开所有权限
    if (user.roles.includes(Roles.ADMIN))
      return true

    const allPermissions = await this.authService.getPermissionsCache(user.uid) ?? await this.authService.getPermissions(user.uid)
    // console.log(allPermissions)
    let canNext = false

    // handle permission strings
    if (Array.isArray(payloadPermission)) {
      // 如果所有元素都通过测试，返回 true；
      // 只要有一个元素不通过，立即返回 false（不会继续遍历剩余元素）；
      // 不会改变原数组；
      // 不会对空数组进行检测（空数组调用 every() 直接返回 true）。
      canNext = payloadPermission.every(i => allPermissions.includes(i))
    }

    if (typeof payloadPermission === 'string')
      canNext = allPermissions.includes(payloadPermission)

    if (!canNext)
      throw new BusinessException(ErrorEnum.NO_PERMISSION)

    return true
  }
}
