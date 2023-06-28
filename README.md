## 시작하기 전에

- 프로젝트 생성

```bash
nest new
⚡  We will scaffold your app in a few seconds..
? What name would you like to use for the new project? typeorm-tutorial
? Which package manager would you ❤️  to use? yarn
```

- app.controller.ts 삭제
- app.service.ts 삭제
- app.module.ts 삭제된 컨트롤러, 서비스 관련 소스 삭제

##

## Graphql 시작

- 패키지 설치

```bash
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

```bash
yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

- 제너레이터로 product 리소스 생성

```bash
nest g res product --no-spec
? What transport layer do you use? GraphQL (code first)
? Would you like to generate CRUD entry points? Y
```

- app.module.ts GraphqlModule 바인딩
- 프로젝트 구동하여 각 모듈 의존성 주입 로그 확인

```bash
[Nest] 335  - 06/28/2023, 1:36:17 AM     LOG [InstanceLoader] ProductModule dependencies initialized +1ms
[Nest] 335  - 06/28/2023, 1:36:17 AM     LOG [InstanceLoader] GraphQLSchemaBuilderModule dependencies initialized +0ms
[Nest] 335  - 06/28/2023, 1:36:17 AM     LOG [InstanceLoader] GraphQLModule dependencies initialized +1ms
[Nest] 335  - 06/28/2023, 1:36:17 AM     LOG [GraphQLModule] Mapped {/graphql, POST} route +68ms
[Nest] 335  - 06/28/2023, 1:36:17 AM     LOG [NestApplication] Nest application successfully started +1ms
```

##

## 아폴로 샌드박스

- app.module.ts 에 plugins 추가

```javascript
playground: false, // 플레이 그라운드 활성화 여부
plugins: [ApolloServerPluginLandingPageLocalDefault()],
```

- 프로젝트 구동 & http://localhost:3000/graphql 확인

**[장점]**

- 플래이그라운드 보다 편리한 기능, UI 클릭으로 원하는 필드 query & mutation 셋팅 가능.
- docs : https://www.apollographql.com/blog/announcement/platform/apollo-sandbox-an-open-graphql-ide-for-local-development/

##

## Product CRUD 틀 만들기

- Product 엔티티 : @ObjectType() & 맴버 추가
- CreateProductInput : @InputType() & 맴버 추가
- ProductService : 함수들 임시로 빈배열 리턴하도록 수정
- 프로젝트 구동 & 아폴로 샌드박스에서 스키마와, 빈배열 리턴 확인

**[주의]**

- 리졸버 함수가 겹치는게 있어선 안된다.
- findAllProduct(), findOneProduct() 같이 유니크 한 명칭을 권장한다.

## database-module-add

- typeorm 패키지 설치

```bash
yarn add @nestjs/typeorm typeorm mysql2
```

```bash
npm install @nestjs/typeorm typeorm mysql2
```

- env 관리를 위한 config 패키지 설치

```bash
yarn add @nestjs/config
```

```bash
npm install @nestjs/config
```

- src/database/database.module.ts 생성
- src/app.module.ts
  - ConfigModule.forRoot() 글로벌 옵션추가
  - database 모듈 import 바인딩
- 프로젝트 구동하여 모듈들 의존성 주입 확인

```bash
[Nest] 605  - 06/28/2023, 2:07:19 AM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +26ms
```

## product CRUD 실제 구현

- Entity 변환을 돕기 위한 패키지 설치

```shell
yarn add class-validator class-transformer
```

```shell
npm install class-validator class-transformer
```

- src/product/entities/product.entity.ts : typeorm 관련 데커레이터 추가
- src/product/product.service.ts
  - Repository 의존성 주입 & CRUD 관련 함수 추가
  - 함수들 await, async 추가
- src/product/product.resolver.ts : 함수들 async 키워드 추가

## 로거 플러그인

## 로거 미들웨어
