# Promise.all()

Promise.all() is used when you want to run multiple promises in parallel and wait until **all** of them are completed.

## Syntax

```js
Promise.all([promise1, promise2, promise3]);
```

## Example with 3 API calls

```js
const profilePromise = fetch('/api/profile').then((r) => r.json());
const ordersPromise = fetch('/api/orders').then((r) => r.json());
const rewardsPromise = fetch('/api/rewards').then((r) => r.json());

const result = await Promise.all([
  profilePromise,
  ordersPromise,
  rewardsPromise,
]);
```

## Important behavior

- All promises start at the same time.
- Promise.all resolves only when every promise is fulfilled.
- Final output is a single array.
- Array order is based on input promise order, not completion order.

## Request timeline table

| API Call | Starts | Finishes | Included in Final Array |
| --- | --- | --- | --- |
| Profile API | Immediately | 1800ms | Yes |
| Orders API | Immediately | 700ms | Yes |
| Rewards API | Immediately | 1200ms | Yes |

## Output format

```js
[
  { endpoint: '/api/profile', payload: { id: 101, value: 'Ava' } },
  { endpoint: '/api/orders', payload: { id: 102, value: '3 active orders' } },
  { endpoint: '/api/rewards', payload: { id: 103, value: '240 points' } }
]
```

## Rejection behavior

If any one promise rejects, Promise.all rejects immediately.

```js
try {
  const data = await Promise.all([promise1, promise2, promise3]);
} catch (error) {
  console.error('One promise failed:', error);
}
```

## When to use

Use Promise.all when:

- you need all results together,
- all operations are independent,
- and it is okay to fail fast when one operation fails.
