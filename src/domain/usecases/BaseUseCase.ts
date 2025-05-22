export abstract class BaseUseCase<T, R> {
  abstract execute(params: T): Promise<R>;
}

export abstract class BaseUseCaseNoParams<R> {
  abstract execute(): Promise<R>;
}
