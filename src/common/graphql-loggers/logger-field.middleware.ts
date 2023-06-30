import { Logger } from '@nestjs/common';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

/**
FieldMiddleware 용도
- 요청이 처리되는 동안 실행
- 주로 개발 및 디버깅 목적으로 사용
- 해당 필드에 대한 값의 해결과정을 로깅
- 요청의 처리 시간, 필드 해결 값 등 중요한 이벤트를 로깅
- 이 처리시간으로 @complexity 필드 복잡성 값을 판단하는 매우 중요한 척도가 된다.
 */
export const loggerFieldMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const startTime = Date.now(); // 처리 시작 시간 기록
  const fieldName = ctx.info.fieldName;

  const value = await next(); // 값 처리.
  const duration = Date.now() - startTime; // 처리 시간
  Logger.log(`+${duration}ms ${value}`, fieldName);
  return value;
};
