import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
export const swagger = (app) => {
    const options = new DocumentBuilder()
    .setTitle('Avila Tek Test API')
    .setDescription('Api to managment users, products and orders')
    .setVersion('1.0.0')
      .addBearerAuth()

    .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/docs',app,document,{
        explorer:true,
        swaggerOptions:{
            filter:true,
            showRequestDuration:true,  

        }
    });

}