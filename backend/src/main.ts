import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
const config = require("../ormconfig")[process.env.NODE_ENV || "development"];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger settings
  const swaggerConfig = new DocumentBuilder()
    .setTitle("모두의 추첨")
    .setDescription("모두의 추첨 모두해, 모두의 추첨 모두해")
    .setVersion("1.0.0")
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);

  // CORS
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  await app.listen(config.port);
}
bootstrap();
