import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductModule } from './product/product.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LoggerPlugin } from './common/graphql-loggers/logger.plugin';
import { loggerFieldMiddleware } from './common/graphql-loggers/logger-field.middleware';
import { ComplexityPlugin } from './common/complexity/complexity.plugin';
import { DebugModule } from './debug/debug.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      buildSchemaOptions: {
        fieldMiddleware: [loggerFieldMiddleware],
      },
    }),
    DebugModule.forRoot({}),
    DatabaseModule,
    ProductModule,
  ],
  providers: [ComplexityPlugin, LoggerPlugin],
})
export class AppModule {}
