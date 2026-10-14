import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { toDateFilter } from '../../common/utils/date-filter.js'
import type { Prisma } from '../../generated/prisma/client.js'
import { AccessRequestStatus } from '../../generated/prisma/enums.js'
import { PrismaService } from '../../prisma/prisma.service.js'
import { userSearchWhere } from '../users/user-search.js'
import type { User } from '../users/users.select.js'
import { accessRequestSelect, toAccessRequest } from './access-requests.select.js'
import type { AccessRequestsQueryDto } from './dto/access-requests-query.dto.js'
import type { CreateAccessRequestDto } from './dto/create-access-request.dto.js'

@Injectable()
export class AccessRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany({ status, search, role, from, to, page, limit }: AccessRequestsQueryDto) {
    const where: Prisma.AccessRequestWhereInput = {
      createdAt: toDateFilter({ from, to }),
      ...(status === 'pending' && { status: AccessRequestStatus.PENDING }),
      ...(status === 'reviewed' && { status: { not: AccessRequestStatus.PENDING } }),
      ...(search && { user: userSearchWhere(search) }),
      ...(role && { role: { name: role } }),
    }

    const [requests, total] = await this.prisma.$transaction([
      this.prisma.accessRequest.findMany({
        where,
        select: accessRequestSelect,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.accessRequest.count({ where }),
    ])

    return { items: requests.map(toAccessRequest), total, page, limit }
  }

  async findMine(userId: number) {
    const requests = await this.prisma.accessRequest.findMany({
      where: { userId },
      select: accessRequestSelect,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    })
    return requests.map(toAccessRequest)
  }

  async create(user: User, { role, reason }: CreateAccessRequestDto) {
    if (user.roles.includes(role)) {
      throw new ConflictException('Bu rol sizda allaqachon bor')
    }

    const pending = await this.prisma.accessRequest.findFirst({
      where: { userId: user.id, role: { name: role }, status: AccessRequestStatus.PENDING },
    })
    if (pending) {
      throw new ConflictException("Bu rol uchun so'rov allaqachon yuborilgan")
    }

    const request = await this.prisma.accessRequest.create({
      data: {
        reason,
        user: { connect: { id: user.id } },
        role: { connect: { name: role } },
      },
      select: accessRequestSelect,
    })
    return toAccessRequest(request)
  }

  async review(id: number, approve: boolean) {
    const request = await this.prisma.accessRequest.findUnique({ where: { id } })
    if (!request) {
      throw new NotFoundException("So'rov topilmadi")
    }
    if (request.status !== AccessRequestStatus.PENDING) {
      throw new BadRequestException("So'rov allaqachon ko'rib chiqilgan")
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      if (approve) {
        await tx.userRole.createMany({
          data: { userId: request.userId, roleId: request.roleId },
          skipDuplicates: true,
        })
      }
      return tx.accessRequest.update({
        where: { id },
        data: {
          status: approve ? AccessRequestStatus.APPROVED : AccessRequestStatus.REJECTED,
          reviewedAt: new Date(),
        },
        select: accessRequestSelect,
      })
    })
    return toAccessRequest(updated)
  }
}
