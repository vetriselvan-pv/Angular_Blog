export function Retry(count: number) {
  return function aync(
    target: Object,
    propertyKey: string | undefined,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      let lastError: any;
      for (let i = 0; i < count; i++) {
        try {
          return await originalMethod.call(this, args);
        } catch (error) {
          lastError = error;
          console.warn(`Attempt ${i + 1} failed. Retrying...`);
        }
      }
      throw lastError;
    };
    return descriptor;
  };
}
