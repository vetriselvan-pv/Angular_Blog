export function Performance(target:Object, propertyKey: string | undefined, descriptor : TypedPropertyDescriptor<any> ){
    const originalMethod = descriptor.value;
    descriptor.value = function(this: any,...args: any[]){
        const start = performance.now();
        const result = originalMethod.call(this,...args);
        const end = performance.now();
        console.log(`Time taken by ${propertyKey} ${(end - start).toFixed(2)}ms`);
        return result
    }
    return descriptor
}