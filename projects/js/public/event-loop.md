# JavaScript Event Loop

The event loop coordinates call stack, callback queue, and microtask queue.

## Core pieces

- Call Stack: executes sync code.
- Web APIs: timers, network APIs.
- Callback Queue: macrotasks (`setTimeout`).
- Microtask Queue: promises (`then`, `catch`).

## Execution order

1. Run sync code.
2. Flush microtasks.
3. Run one macrotask.
4. Repeat.

## Example

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

Output order: `A, D, C, B`.
