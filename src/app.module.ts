import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import configMongo from 'mongoconfig';
import { User, UserSchema } from './users/infrastructure/collections/user.entity';
import { Product, ProductSchema } from './product/infrastructure/collections/product.schema';
import { Order, OrderSchema } from './order/infrastructure/collections/order.schema';
import { UserController } from './users/infrastructure/controllers/user.controller';
import { ProductController } from './product/infrastructure/controllers/product.controller';
import { OrdersController } from './order/infrastructure/controllers/order.controller';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthModule } from './auth/auth.module';
console.log('configMongo.mongoURI',configMongo.mongoURI)
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(configMongo.mongoURI.trim()),
    MongooseModule.forFeature([
      { name: 'User', schema:UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name , schema: OrderSchema },
    
    ])
  ],
  controllers: [AppController,UserController,ProductController,OrdersController, AuthController],
  providers: [AppService],
})
export class AppModule {}


// STRING CON FOR MONGODB mongodb://localhost:27017mongodb://localhost:27017