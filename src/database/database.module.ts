import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // 모듈 설정시 외부에서 설정을 가져올땐 forRootAsync 를 사용하며, 직접적으로 선언하는 경우엔 forRoot() 로 사용한다.
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'), // getOrThrow 는 가져올때 없으면 오류를 발생시킴.
        port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        autoLoadEntities: true, // 이 옵션을 true 로 줌으로서, 모델이 어디에 있는지 수동으로 알릴 필요가 없음.
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'), // 동기화 여부
      }),
      inject: [ConfigService], // 위 useFactory 에 의존성 주입을 위해 inject 를 선언한다.
    }),
  ],
})
export class DatabaseModule {}
