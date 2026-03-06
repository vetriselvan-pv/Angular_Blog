# Async and Await

`async` and `await` make asynchronous code look synchronous and easier to read.

## Basic usage

```js
async function loadUser() {
  const response = await fetch('/api/user');
  return response.json();
}
```

## Key points

- `async` functions always return a Promise.
- `await` pauses only inside `async` functions.
- Use `try/catch` for error handling.

## Error handling

```js
async function run() {
  try {
    const data = await loadUser();
    console.log(data);
  } catch (error) {
    console.error('Request failed', error);
  }
}
```
