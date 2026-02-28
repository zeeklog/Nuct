import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Validate,
  ValidateIf,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { isEmpty } from 'lodash'

import { NETDISK_HANDLE_MAX_ITEM } from '~/constants/oss.constant'

@ValidatorConstraint({ name: 'IsLegalNameExpression', async: false })
export class IsLegalNameExpression implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    try {
      if (isEmpty(value))
        throw new Error('dir name is empty')

      if (value.includes('/'))
        throw new Error('dir name not allow /')

      return true
    }
    catch (e) {
      return false
    }
  }

  defaultMessage(_args: ValidationArguments) {
    return 'file or dir name invalid'
  }
}

/** 校验网盘 path 参数，禁止路径遍历 */
@ValidatorConstraint({ name: 'IsSafeNetdiskPath', async: false })
export class IsSafeNetdiskPath implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    if (isEmpty(value))
      return true
    if (value.includes('..') || value.startsWith('/'))
      return false
    if (!/^[\w\u4e00-\u9fa5/.-]*\/?$/.test(value))
      return false
    return true
  }

  defaultMessage() {
    return 'path invalid: path traversal or illegal characters not allowed'
  }
}

export class FileOpItem {
  @ApiProperty({ description: '文件类型', enum: ['file', 'dir'] })
  @IsString()
  @Matches(/(^file$)|(^dir$)/)
  type: string

  @ApiProperty({ description: '文件名称' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsLegalNameExpression)
  name: string
}

export class GetFileListDto {
  @ApiProperty({ description: '分页标识' })
  @IsOptional()
  @IsString()
  marker: string

  @ApiProperty({ description: '当前路径' })
  @IsString()
  @Validate(IsSafeNetdiskPath)
  path: string

  @ApiPropertyOptional({ description: '搜索关键字' })
  @Validate(IsLegalNameExpression)
  @ValidateIf(o => !isEmpty(o.key))
  @IsString()
  key: string
}

export class MKDirDto {
  @ApiProperty({ description: '文件夹名称' })
  @IsNotEmpty()
  @IsString()
  @Validate(IsLegalNameExpression)
  dirName: string

  @ApiProperty({ description: '所属路径' })
  @IsString()
  @Validate(IsSafeNetdiskPath)
  path: string
}

export class RenameDto {
  @ApiProperty({ description: '文件类型' })
  @IsString()
  @Matches(/(^file$)|(^dir$)/)
  type: string

  @ApiProperty({ description: '更改的名称' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsLegalNameExpression)
  toName: string

  @ApiProperty({ description: '原来的名称' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsLegalNameExpression)
  name: string

  @ApiProperty({ description: '路径' })
  @IsString()
  @Validate(IsSafeNetdiskPath)
  path: string
}

export class FileInfoDto {
  @ApiProperty({ description: '文件名' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsLegalNameExpression)
  name: string

  @ApiProperty({ description: '文件所在路径' })
  @IsString()
  @Validate(IsSafeNetdiskPath)
  path: string
}

export class DeleteDto {
  @ApiProperty({ description: '需要操作的文件或文件夹', type: [FileOpItem] })
  @Type(() => FileOpItem)
  @ArrayMaxSize(NETDISK_HANDLE_MAX_ITEM)
  @ValidateNested({ each: true })
  files: FileOpItem[]

  @ApiProperty({ description: '所在目录' })
  @IsString()
  @Validate(IsSafeNetdiskPath)
  path: string
}

export class MarkFileDto {
  @ApiProperty({ description: '文件名' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsLegalNameExpression)
  name: string

  @ApiProperty({ description: '文件所在路径' })
  @IsString()
  @Validate(IsSafeNetdiskPath)
  path: string

  @ApiProperty({ description: '备注信息' })
  @IsString()
  mark: string
}

export class FileOpDto {
  @ApiProperty({ description: '需要操作的文件或文件夹', type: [FileOpItem] })
  @Type(() => FileOpItem)
  @ArrayMaxSize(NETDISK_HANDLE_MAX_ITEM)
  @ValidateNested({ each: true })
  files: FileOpItem[]

  @ApiProperty({ description: '操作前的目录' })
  @IsString()
  @Validate(IsSafeNetdiskPath)
  originPath: string

  @ApiProperty({ description: '操作后的目录' })
  @IsString()
  @Validate(IsSafeNetdiskPath)
  toPath: string
}
