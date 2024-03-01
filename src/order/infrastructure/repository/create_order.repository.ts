import { Result } from '../../../common/infrastructure/results/result';
import MongooseConnection from '../../../common/infrastructure/mongo_singleton';
import { RepositoryInterface } from '../../../common/application/repository/repository.interface';
import { CreateOrderDto, productOrderDto } from '../../domain/dtos/create_order.dto';
import { NotFoundException } from '@nestjs/common';


export class CreateOrderRepository implements RepositoryInterface<CreateOrderDto, void> {
  constructor() {
  }

  async execute(order: CreateOrderDto): Promise<Result<void>> {
    order.total = 0;
    const existingProduct = [];
    const productOrders = [];
    const user = await (await MongooseConnection.getInstance()).model('User').findOne({
      _id: order.users,
    });
    if (user) {
      order.users = user;
      const product_ids = order.product.map(item => item.product);
      let hola;
      const products = await (await MongooseConnection.getInstance()).model('Product').find({
        _id: { $in: product_ids },
      });

      products.forEach(product => {
        if (!product_ids.includes(product._id)) {
          existingProduct.push(product.name.toString());

        }
        hola = order.product.find((item: productOrderDto) => item.product === product._id).quantity;
        order.total = order.total + (product.price * order.product.find((item: productOrderDto) => item.product === product._id).quantity);
        productOrders.push({
          products: product,
          quantity: order.product.find((item: productOrderDto) => item.product === product._id).quantity,

        });


      });
      if (existingProduct.length === 0) {
        // Inserta 'ProductOrder'
        const productOrderDocs = await (await MongooseConnection.getInstance()).model('ProductOrder').insertMany(productOrders);

        // Obtén los IDs de los documentos 'ProductOrder' insertados
        const productOrderIds = productOrderDocs.map(doc => doc._id);
        const orderCreated = {
          products: productOrderDocs,
          users: order.users,
          total: order.total,
          status: 'pending',
        };
        return Result.success(await (await MongooseConnection.getInstance()).model('Order').create(orderCreated));
      } else return Result.fail(new NotFoundException(`Following Products are not exists: ${existingProduct} `));

    } else
      return Result.fail(new NotFoundException('User not found'));
  }

}