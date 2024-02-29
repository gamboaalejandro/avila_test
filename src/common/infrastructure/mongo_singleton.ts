import mongoose from 'mongoose';
import { UserSchema } from '../../users/infrastructure/collections/user.entity';
import { ProductSchema } from '../../product/infrastructure/collections/product.schema';
import { OrderSchema } from '../../order/infrastructure/collections/order.schema';
import { ProductOrderSchema } from '../../order/infrastructure/collections/products_in_order.schema';
import { RoleSchema } from '../../auth/schemas/role.collection';

class MongooseConnection {
  private static instance: mongoose.Connection;

  private constructor() {}

  public static async getInstance(): Promise<mongoose.Connection> {
    if (!MongooseConnection.instance) {
      await mongoose.connect(process.env.MONGO_URI, {
      });
      mongoose.model('User', UserSchema)
      mongoose.model('Product', ProductSchema)
      mongoose.model('Order', OrderSchema)
      mongoose.model('ProductOrder', ProductOrderSchema)
      mongoose.model('Role', RoleSchema)

    MongooseConnection.instance = mongoose.connection;
      MongooseConnection.instance.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }

    return MongooseConnection.instance;
  }
}

export default MongooseConnection;