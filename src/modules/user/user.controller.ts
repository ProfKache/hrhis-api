import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  CreateUserResponse,
  UserInterface,
} from 'src/core/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): UserInterface[] {
    return this.userService.getUsers();
  }

  // @Get(':id/:name')
  // getUser(@Param() params: {id: number; name: string}): UserInterface {
  //     return ({id: params.id, name: params.name});
  // }

  @Get(':id')
  getUser(@Param() params: { id: string }, @Res() res): UserInterface {
    try {
      return res
        .status(HttpStatus.OK)
        .send(this.userService.getUser(params.id));
    } catch (e) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ error: `User with ${params.id} not Found` });
    }
  }

  @Post()
  async createUser(
    @Body() payload: UserInterface,
    @Res() res,
  ): Promise<UserInterface> {
    try {
      const newUser = await this.userService.createUser(payload);
      return res.status(HttpStatus.CREATED).send(newUser);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({ error: e.message });
    }
  }

  @Post('with-message')
  createUserWithMessage(
    @Body() payload: UserInterface,
    @Res() res,
  ): CreateUserResponse {
    try {
      return res
        .status(HttpStatus.CREATED)
        .send(this.userService.createUserWithMessage(payload));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({ error: e.message });
    }
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() payload: UserInterface,
    @Res() res,
  ): CreateUserResponse {
    const obj = this.userService.updateUser(id, payload);
    try {
      return res.status(HttpStatus.OK).send(obj);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({ error: e.message });
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res() res): CreateUserResponse {
    try {
      return res.status(HttpStatus.OK).send(this.userService.deleteUser(id));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send({ error: e.message });
    }
  }
}
