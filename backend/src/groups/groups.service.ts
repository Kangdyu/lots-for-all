import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonResponse } from 'src/common/interfaces/CommonResponse';
import { User } from 'src/users/entities/users.entitiy';
import { UsersService } from 'src/users/users.service';
import { Repository, UpdateResult } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupInfoDto } from './dto/group-info.dto';
import { Group } from './entities/groups.entitiy';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    private readonly usersService: UsersService
  ) {}

  async checkGroupExist(group_id: number) {
    const group: Group = await this.groupRepository.findOneBy({ id: group_id });
    if (!group) {
      throw new BadRequestException('Cannot find group');
    }
    return group;
  }

  private entityToDto(entity: Group): GroupInfoDto {
    return new GroupInfoDto(entity);
  }

  private async createUserEntityByDto(dto: CreateGroupDto, user: User): Promise<Group> {
    const group: Group = new Group();
    group.user = user;
    group.members = dto.members.join(',');

    return group;
  }

  async create(
    user_id: number,
    createGroupDto: CreateGroupDto
  ): Promise<CommonResponse<GroupInfoDto>> {
    const user = await this.usersService.checkUserExist({ id: user_id });

    const createdGroup: Group = await this.groupRepository.save(
      await this.createUserEntityByDto(createGroupDto, user)
    );

    return {
      result: this.entityToDto(createdGroup),
      message: 'success',
    };
  }

  async find(user_id: number): Promise<CommonResponse<{ groups: GroupInfoDto[] }>> {
    this.usersService.checkUserExist({ id: user_id });

    const groups: Group[] = await this.groupRepository.find();

    return {
      result: {
        groups: groups.map((group) => this.entityToDto(group)),
      },
      message: 'success',
    };
  }

  async findOne(
    user_id: number,
    group_id: number
  ): Promise<CommonResponse<{ group: GroupInfoDto }>> {
    this.usersService.checkUserExist({ id: user_id });
    const group: Group = await this.checkGroupExist(group_id);

    return {
      result: {
        group: this.entityToDto(group),
      },
      message: 'success',
    };
  }

  async update(
    user_id: number,
    group_id: number,
    createGroupDto: CreateGroupDto
  ): Promise<CommonResponse<null>> {
    const user = await this.usersService.checkUserExist({ id: user_id });
    await this.checkGroupExist(group_id);

    const updatedGroup: UpdateResult = await this.groupRepository.update(
      {
        id: group_id,
      },
      await this.createUserEntityByDto(createGroupDto, user)
    );
    return {
      message: 'success',
    };
  }

  async delete(user_id: number, group_id: number): Promise<CommonResponse<null>> {
    await this.usersService.checkUserExist({ id: user_id });
    await this.checkGroupExist(group_id);

    await this.groupRepository.delete({ id: group_id });

    return {
      message: 'success',
    };
  }
}
