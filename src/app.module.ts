import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import configMongo from 'mongoconfig';
import { User, UserSchema } from './users/infrastructure/entities/user.entity';
import { Product, ProductSchema } from './product/infrastructure/collections/product.schema';
import { Order, OrderSchema } from './order/infrastructure/collections/order.schema';
console.log('configMongo.mongoURI',configMongo.mongoURI)
@Module({
  imports: [
    MongooseModule.forRoot(configMongo.mongoURI.trim()),
    MongooseModule.forFeature([
      { name: User.name, schema:UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name , schema: OrderSchema },
    
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// STRING CON FOR MONGODB mongodb://localhost:27017mongodb://localhost:27017