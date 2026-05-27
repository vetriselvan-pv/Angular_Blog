export function Debounce(ms: number): MethodDecorator {
  const timers = new WeakMap<object, ReturnType<typeof setTimeout>>();

  return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;
    console.log(target)

    descriptor.value = function (...args: any[]) {
      clearTimeout(timers.get(this));

      const timeout = setTimeout(() => {
        originalMethod.apply(this, args);
      }, ms);

      timers.set(this, timeout);
    };

    return descriptor;
  };
}
