import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Product } from '../collections/product.schema';
import { CreateProductRepository } from '../repository/create_product.repository';
import { CreateProductApplicationService } from '../../application/create_product.application.service';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import { CreateProductDto } from '../../domain/dto/create_product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
import { IApplicationService } from '../../../common/application/application-service.interface';
import { MyResponse } from '../../../common/infrastructure/results/response';
import { UpdateProductDto } from '../../domain/dto/update_product.dto';
import { UpdateProductApplicationService } from '../../application/update_product.application.service';
import { UpdateProductRepository } from '../repository/update_product.repository';
import { DeleteProductRepository } from '../repository/delete_product.repository';
import { DeleteProductApplicationService } from '../../application/delete_product.application.service';
import { FindProductRepository } from '../repository/find_product.repository';
import { MainCriteriaInterface } from '../../../users/domain/criterias/main_criteria.interface';
import { ProductCriteria } from '../../domain/criterias/product_criteria';
import { FindProductApplicationService } from '../../application/find_product.application.service';
import { JwtAuthGuard } from '../../../auth/jwt/jwt.auth.guard';
import { AuthGuard } from '../../../auth/jwt/auth.guard';


@ApiTags('products')

@Controller('products')
export class ProductController {
  //repository
  private readonly productRepository: RepositoryInterface<CreateProductDto, void> = new CreateProductRepository();
  private readonly updateProductRepository: RepositoryInterface<UpdateProductDto, void> = new UpdateProductRepository();
  private readonly deleteProductRepository: RepositoryInterface<String, void> = new DeleteProductRepository();
  private readonly findProductRepository: RepositoryInterface<MainCriteriaInterface, ProductEntity> = new FindProductRepository();
  //application service
  private readonly createProductApplicationService: IApplicationService<CreateProductDto, void | void[]> = new CreateProductApplicationService(this.productRepository);
  private readonly updateProductApplicationService: IApplicationService<UpdateProductDto, void | void[]> = new UpdateProductApplicationService(this.updateProductRepository);
  private readonly deleteProductApplicationService: IApplicationService<String, void | void[]> = new DeleteProductApplicationService(this.deleteProductRepository);
  private readonly findProductApplicationService: IApplicationService<MainCriteriaInterface, ProductEntity> = new FindProductApplicationService(this.findProductRepository);

  constructor() {
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  async findAll(@Query() query: ProductCriteria) {
    const result = await this.findProductApplicationService.execute(query);
    if (result.IsSuccess) {
      return MyResponse.success(result.Value);
    } else {
      return MyResponse.fail(result.statusCode || 500, result.message, result.error);
    }

  }

  @ApiBearerAuth()

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a product by its id' })
  @ApiResponse({ status: 200, description: 'Return a single product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: string) {
    //return this.productService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  async create(@Body() product: CreateProductDto): Promise<MyResponse<String> | void> {
    const result = await this.createProductApplicationService.execute(product);
    if (result.IsSuccess) {
      return MyResponse.success('Producto creado con éxito');
    } else {
      return MyResponse.fail(result.statusCode || 500, result.message, result.error);
    }

  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  async update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    const product_: UpdateProductDto = new UpdateProductDto(id, product.name, product.description, product.price, product.stock);
    product._id = id;
    const result = await this.updateProductApplicationService.execute(product);
    if (result.IsSuccess) {
      return MyResponse.success('Producto Actualizado con éxito');
    } else {
      return MyResponse.fail(result.statusCode || 500, result.message, result.error);
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'The product has been successfully deleted.' })
  async delete(@Param('id') id: string) {
    const result = await this.deleteProductApplicationService.execute(id);
    if (result.IsSuccess) {
      return MyResponse.success('Producto Eliminado con éxito');
    } else {
      return MyResponse.fail(result.statusCode || 500, result.message, result.error);
    }
  }
}
