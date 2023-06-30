# DebugModule

## 소개

- 제공하는 데커레이터를 등록하게 되면 해당 메서드가 전달 받는 args 와 실행 시간을 디버깅할 수 있다.
- 특정 **모듈**에 적용하거나, 특정 **컨트롤러, 리졸버, 서비스** 단위 및 특정 **메서드** 단위 별로도 디버깅 가능하다.

##

## DebugModule 적용

- src/app.module.ts 에 바인딩합니다.

```javascript
@Module({
  imports: [DebugModule.forRoot({})],
})
export class AppModule {}
```

## Class 적용

- 해당 클래스 메서드들 전부 디버그 대상이 됩니다.

```javascript
@Controller()
@DebugLog('ClassContext')
export class AppController {}
```

##

## Method 적용

```javascript
@Get()
@DebugLog('MethodContext')
public method() {}
```

##

## Module 단위 적용

- 해당 모듈 providers 클래스(컨트롤러, 서비스)들의 메서드들 전부 대상이 됩니다.

```javascript
@Debug(ProductModule.name)
@Module({
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
```

##

## Module 단위 적용에서 특정 클래스 를 제외 시킬 수 있습니다.

```javascript
@Debug({ context: ProductModule.name, exclude: [ProductResolver] })
```

##

## 디버깅 출력 예시

- ProductResolver.findOneProduct() 에 **1** 이 넘어왔으며, 처리 시간은 +21.52ms 임을 보여줍니다.

```bash
[Nest] 2494  - 06/30/2023, 6:15:15 AM   DEBUG [ProductResolver] findOneProduct([
  1
]) +21.52ms
```

- ProductResolver.updateProduct() 에 다음과 같은 InputType 이 넘어왔으며, 처리시간은 +41.70ms 임을 보여줍니다.

```bash
[Nest] 2494  - 06/30/2023, 6:16:39 AM   DEBUG [ProductResolver] updateProduct([
  {
    "p_id": 3,
    "p_name": "상품1",
    "p_price": 10000,
    "p_product_detail": {
      "pd_description": "상품설명2"
    },
    "p_product_options": [
      {
        "po_id": 1,
        "po_name": "옵션이름1",
        "po_value": "옵션값1"
      },
      {
        "po_id": 3,
        "po_name": "옵션이름2",
        "po_value": "옵션값2"
      }
    ],
    "p_product_tags": [
      {
        "pt_name": "태그up2"
      }
    ]
  }
]) +41.70ms
```

##
