import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from '../../domain/dtos/create_order.dto';
import { Order } from '../collections/order.schema';
import { UpdateOrderDto } from '../../domain/dtos/update_order.dto';


@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.', type: Order })
  async create(@Body() createOrderDto: CreateOrderDto) {
    //return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Return all orders.', type: [Order] })
  async findAll() {
    //return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by id' })
  @ApiResponse({ status: 200, description: 'Return a single order.', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async findOne(@Param('id') id: string) {
    //return this.ordersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.', type: Order })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    //return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 204, description: 'The order has been successfully deleted.' })
  async remove(@Param('id') id: string): Promise<void> {
    //return this.ordersService.remove(id);
  }
}
