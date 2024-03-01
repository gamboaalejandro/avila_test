import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto } from '../../domain/dtos/create_order.dto';
import { Order } from '../collections/order.schema';
import { UpdateOrderDto } from '../../domain/dtos/update_order.dto';
import { CreateOrderRepository } from '../repository/create_order.repository';
import { CreateOrderApplicationService } from '../../application/create_order.application.service';
import { IApplicationService } from '../../../common/application/application-service.interface';
import { MyResponse } from '../../../common/infrastructure/results/response';
import { JwtAuthGuard } from '../../../auth/jwt/jwt.auth.guard';
import { DeleteProductRepository } from '../../../product/infrastructure/repository/delete_product.repository';
import { DeleteOrderApplicationService } from '../../application/delete_order.application.service';
import { AuthGuard } from '../../../auth/jwt/auth.guard';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import { OrderCriteria } from '../../domain/criteria/order.criteria';
import { FindOrderRepository } from '../repository/find_orders.repository';
import { FindOrderApplicationService } from '../../application/find_orders.application.service';


@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  //Repository
  private readonly createOrderRepository:CreateOrderRepository = new CreateOrderRepository();
  private readonly deleteOrderRepository:DeleteProductRepository = new DeleteProductRepository();
  private readonly findOrderRepository:RepositoryInterface<OrderCriteria, Order> = new FindOrderRepository();

  //Services
  private readonly  createOrderApplicationService:IApplicationService<CreateOrderDto, void> = new CreateOrderApplicationService(this.createOrderRepository)
  private readonly  deleteOrderApplicationService:IApplicationService<String, void> = new DeleteOrderApplicationService(this.deleteOrderRepository)
  private readonly  FindOrderApplicationService:IApplicationService<OrderCriteria, Order> = new FindOrderApplicationService(this.findOrderRepository)
  constructor() {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/order')
  @ApiOperation({ summary: 'Get an order by id' })
  @ApiResponse({ status: 200, description: 'Return a user orders.', type: Order })
  @ApiResponse({ status: 404, description: 'User not found. this user has not orders' })
  async findOne(@Req() req) {
    const token = req.decodedData;
    const orderCriteria = new OrderCriteria();
    orderCriteria.users = token.username;
    const result = await this.FindOrderApplicationService.execute(orderCriteria);
    if (result.IsSuccess) {
      return MyResponse.success(result.Value);
    }else
    {
      return MyResponse.fail(result.statusCode || 500, result.message, result.error);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 204, description: 'The order has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Order Not Found' })
  async remove(@Param('id') id: string) {
    const result = await this.deleteOrderApplicationService.execute(id);
    if (result.IsSuccess) {
      return MyResponse.success(result.Value);
    }else
    {
      return MyResponse.fail(result.statusCode || 500, result.message, result.error);
    }
  }
}
