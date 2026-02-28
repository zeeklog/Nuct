import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'
import { AuthUser } from '~/modules/auth/decorators/auth-user.decorator'

import { definePermission, Perm } from '~/modules/auth/decorators/permission.decorator'
import { TenantContextService } from '~/modules/tenant/tenant-context.service'

import { checkIsDemoMode } from '~/utils'

import { SFileInfoDetail, SFileList, UploadToken } from './manage.class'
import {
  DeleteDto,
  FileInfoDto,
  FileOpDto,
  GetFileListDto,
  MarkFileDto,
  MKDirDto,
  RenameDto,
} from './manage.dto'
import { NetDiskManageService } from './manage.service'

export const permissions = definePermission('netdisk:manage', {
  LIST: 'list',
  CREATE: 'create',
  INFO: 'info',
  UPDATE: 'update',
  DELETE: 'delete',
  MKDIR: 'mkdir',
  TOKEN: 'token',
  MARK: 'mark',
  DOWNLOAD: 'download',
  RENAME: 'rename',
  CUT: 'cut',
  COPY: 'copy',
} as const)

@ApiTags('NetDiskManage - 网盘管理模块')
@Controller('manage')
export class NetDiskManageController {
  constructor(
    private manageService: NetDiskManageService,
    private tenantContext: TenantContextService,
  ) {}

  /** 按租户+用户隔离路径，防止越权访问 */
  private prefixPath(userPath: string, uid: number): string {
    const tenantId = this.tenantContext.getTenantId()
    const base = `${tenantId}/${uid}/`
    const normalized = (userPath || '').replace(/^\//, '')
    return normalized ? `${base}${normalized}${normalized.endsWith('/') ? '' : '/'}` : base
  }

  @Get('list')
  @ApiOperation({ summary: '获取文件列表' })
  @ApiOkResponse({ type: SFileList })
  @Perm(permissions.LIST)
  async list(@Query() dto: GetFileListDto, @AuthUser() user: IAuthUser): Promise<SFileList> {
    const path = this.prefixPath(dto.path, user.uid)
    return await this.manageService.getFileList(path, dto.marker, dto.key)
  }

  @Post('mkdir')
  @ApiOperation({ summary: '创建文件夹，支持多级' })
  @Perm(permissions.MKDIR)
  async mkdir(@Body() dto: MKDirDto, @AuthUser() user: IAuthUser): Promise<void> {
    const path = this.prefixPath(dto.path, user.uid)
    const result = await this.manageService.checkFileExist(
      `${path}${dto.dirName}/`,
    )
    if (result)
      throw new BusinessException(ErrorEnum.OSS_FILE_OR_DIR_EXIST)

    await this.manageService.createDir(`${path}${dto.dirName}`)
  }

  @Get('token')
  @ApiOperation({ summary: '获取上传Token，无Token前端无法上传' })
  @ApiOkResponse({ type: UploadToken })
  @Perm(permissions.TOKEN)
  async token(@AuthUser() user: IAuthUser): Promise<UploadToken> {
    checkIsDemoMode()

    return {
      token: this.manageService.createUploadToken(`${user.uid}`),
    }
  }

  @Get('info')
  @ApiOperation({ summary: '获取文件详细信息' })
  @ApiOkResponse({ type: SFileInfoDetail })
  @Perm(permissions.INFO)
  async info(@Query() dto: FileInfoDto, @AuthUser() user: IAuthUser): Promise<SFileInfoDetail> {
    const path = this.prefixPath(dto.path, user.uid)
    return await this.manageService.getFileInfo(dto.name, path)
  }

  @Post('mark')
  @ApiOperation({ summary: '添加文件备注' })
  @Perm(permissions.MARK)
  async mark(@Body() dto: MarkFileDto, @AuthUser() user: IAuthUser): Promise<void> {
    const path = this.prefixPath(dto.path, user.uid)
    await this.manageService.changeFileHeaders(dto.name, path, {
      mark: dto.mark,
    })
  }

  @Get('download')
  @ApiOperation({ summary: '获取下载链接，不支持下载文件夹' })
  @ApiOkResponse({ type: String })
  @Perm(permissions.DOWNLOAD)
  async download(@Query() dto: FileInfoDto, @AuthUser() user: IAuthUser): Promise<string> {
    const path = this.prefixPath(dto.path, user.uid)
    return this.manageService.getDownloadLink(`${path}${dto.name}`)
  }

  @Post('rename')
  @ApiOperation({ summary: '重命名文件或文件夹' })
  @Perm(permissions.RENAME)
  async rename(@Body() dto: RenameDto, @AuthUser() user: IAuthUser): Promise<void> {
    const path = this.prefixPath(dto.path, user.uid)
    const result = await this.manageService.checkFileExist(
      `${path}${dto.toName}${dto.type === 'dir' ? '/' : ''}`,
    )
    if (result)
      throw new BusinessException(ErrorEnum.OSS_FILE_OR_DIR_EXIST)

    if (dto.type === 'file')
      await this.manageService.renameFile(path, dto.name, dto.toName)
    else
      await this.manageService.renameDir(path, dto.name, dto.toName)
  }

  @Post('delete')
  @ApiOperation({ summary: '删除文件或文件夹' })
  @Perm(permissions.DELETE)
  async delete(@Body() dto: DeleteDto, @AuthUser() user: IAuthUser): Promise<void> {
    const path = this.prefixPath(dto.path, user.uid)
    await this.manageService.deleteMultiFileOrDir(dto.files, path)
  }

  @Post('cut')
  @ApiOperation({ summary: '剪切文件或文件夹，支持批量' })
  @Perm(permissions.CUT)
  async cut(@Body() dto: FileOpDto, @AuthUser() user: IAuthUser): Promise<void> {
    const originPath = this.prefixPath(dto.originPath, user.uid)
    const toPath = this.prefixPath(dto.toPath, user.uid)
    if (originPath === toPath)
      throw new BusinessException(ErrorEnum.OSS_NO_OPERATION_REQUIRED)

    await this.manageService.moveMultiFileOrDir(dto.files, originPath, toPath)
  }

  @Post('copy')
  @ApiOperation({ summary: '复制文件或文件夹，支持批量' })
  @Perm(permissions.COPY)
  async copy(@Body() dto: FileOpDto, @AuthUser() user: IAuthUser): Promise<void> {
    const originPath = this.prefixPath(dto.originPath, user.uid)
    const toPath = this.prefixPath(dto.toPath, user.uid)
    await this.manageService.copyMultiFileOrDir(dto.files, originPath, toPath)
  }
}
