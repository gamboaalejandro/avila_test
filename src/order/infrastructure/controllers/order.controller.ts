import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from '../../domain/dtos/create_order.dto';
import { Order } from '../collections/order.schema';
import { UpdateOrderDto } from '../../domain/dtos/update_order.dto';
import { CreateOrderRepository } from '../repository/create_order.repository';
import { CreateOrderApplicationService } from '../../application/create_order.application.service';
import { IApplicationService } from '../../../common/application/application-service.interface';
import { MyResponse } from '../../../common/infrastructure/results/response';
import { JwtAuthGuard } from '../../../auth/jwt/jwt.auth.guard';


@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  //Repository
  private readonly createOrderRepository:CreateOrderRepository = new CreateOrderRepository();

  //Services
  private readonly  createOrderApplicationService:IApplicationService<CreateOrderDto, void> = new CreateOrderApplicationService(this.createOrderRepository)
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.', type: Order })
  async create(@Body() createOrderDto: CreateOrderDto) {
    const result = await this.createOrderApplicationService.execute(createOrderDto);
    if (result.IsSuccess) {
      return MyResponse.success(result.Value);
    }else
    {
      return MyResponse.fail(result.statusCode || 500, result.message, result.error);
    }
    //return this.ordersService.create(createOrderDto);
  }
  @UseGuards(JwtAuthGuard)

  @Get('/orders')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Return all orders.', type: [Order] })
  async findAll() {
    //return this.ordersService.findAll();
  }
  @UseGuards(JwtAuthGuard)

  @Get('/order/:id')
  @ApiOperation({ summary: 'Get an order by id' })
  @ApiResponse({ status: 200, description: 'Return a single order.', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async findOne(@Param('id') id: string) {
    //return this.ordersService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)

  @Put('/update/:id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.', type: Order })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    //return this.ordersService.update(id, updateOrderDto);
  }
  @UseGuards(JwtAuthGuard)

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 204, description: 'The order has been successfully deleted.' })
  async remove(@Param('id') id: string): Promise<void> {
    //return this.ordersService.remove(id);
  }
}
