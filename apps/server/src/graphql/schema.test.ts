import { describe, expect, it, beforeEach } from 'vitest';
import { graphql } from 'graphql';
import { graphqlSchema } from './schema.js';
import { resetStoreForTests } from '../store/memoryStore.js';

describe('GraphQL schema', () => {
  beforeEach(() => {
    resetStoreForTests();
  });

  it('returns orders', async () => {
    const result = await graphql({
      schema: graphqlSchema,
      source: '{ orders { id title productCount } }',
    });

    expect(result.errors).toBeUndefined();
    const data = result.data as { orders: { id: string }[] };
    expect(data.orders.length).toBeGreaterThan(0);
  });

  it('deletes product via mutation', async () => {
    const listResult = await graphql({
      schema: graphqlSchema,
      source: '{ products { id } }',
    });
    const products = (listResult.data as { products: { id: string }[] })
      .products;
    const productId = products[0]?.id;
    expect(productId).toBeDefined();

    const mutation = await graphql({
      schema: graphqlSchema,
      source: `mutation { deleteProduct(id: "${productId}") }`,
    });

    expect(mutation.errors).toBeUndefined();
    expect(mutation.data).toEqual({ deleteProduct: productId });
  });
});
