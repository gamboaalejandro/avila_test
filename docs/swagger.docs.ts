import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
export const swagger = (app) => {
    const options = new DocumentBuilder()
    .setTitle('Avila Tek Test API')
    .setDescription('Api to managment users, products and orders')
    .setVersion('1.0.0')
    .addTag('auth')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token', // Este es el nombre del securityScheme que se puede referenciar en los decoradores @ApiSecurity
      )
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