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

##

## [주의] 관계에 대해서 시작하기전에 typeorm 사전 지식이 있어야함.

[typeorm-tutorial](https://github.com/mysohodevelop/typeorm-tutorial)

##

## @Field() FieldOptions 맴버중 nullable 에 줄 수 있는 옵션

- true: 선택적으로 처리
- false: 필수로 처리
- 'items': 필드가 배열 형태일 때, 배열자체는 필수 & 배열 아이템들 선택적
- 'itemsAndList': 필드가 배열 형태일 때, 배열 자체를 선택적 & 배열 아이템들 선택적

##

## 1:1 관계

src/product/entities/product-detail.entity.ts
src/product/dto/input/create/create-product-detail.input-type.ts
src/product/dto/input/update/update-product-detail.input-type.ts
src/product/dto/response/product-detail.object-type.ts

##

## 1:N 관계

src/product/entities/product-option.entity.ts
src/product/dto/input/create/create-product-option.input-type.ts
src/product/dto/input/update/update-product-option.input-type.ts
src/product/dto/response/product-option.object-type.ts

##

## N:M 관계

src/product/entities/product-tag.entity.ts
src/product/dto/input/create/create-product-tag.input-type.ts
src/product/dto/input/update/update-product-tag.input-type.ts
src/product/dto/response/product-tag.object-type.ts

##

## 로거 필드 미들웨어

src/common/logger/logger-field.middleware.ts

##

## 로거 플러그인

src/common/logger/logger.plugin.ts

##

## 쿼리 복잡성 제한 두기

- 패키지 설치

```shell
npm install apollo-server-plugin-base
```

```shell
yarn add apollo-server-plugin-base
```

```shell
npm install graphql-query-complexity
```

```shell
yarn add graphql-query-complexity
```

- 쿼리 요청 제한 플러그인 작성
  src/common/complexity/complexity.plugin.ts

- src/app.module.ts providers: [ComplexityPlugin] 추가

##

## 쿼리 복잡성 제한 두기위한 복잡성 테스트

##
