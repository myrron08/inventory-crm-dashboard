import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';
import {
  deleteOrder,
  deleteProduct,
  getOrderById,
  listOrders,
  listProducts,
} from '../store/memoryStore.js';
import type { ProductType } from '../types/domain.js';
import { productTypeOptions, specificationOptions } from '../data/seed.js';

const ProductTypeEnum = new GraphQLEnumType({
  name: 'ProductType',
  values: Object.fromEntries(
    productTypeOptions.map((value) => [value, { value }]),
  ),
});

const OrderSummaryType = new GraphQLObjectType({
  name: 'OrderSummary',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    productCount: { type: new GraphQLNonNull(GraphQLInt) },
    totalPriceUsd: { type: new GraphQLNonNull(GraphQLFloat) },
    totalPriceUah: { type: new GraphQLNonNull(GraphQLFloat) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    orderId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    serialNumber: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(ProductTypeEnum) },
    specification: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    condition: { type: new GraphQLNonNull(GraphQLString) },
    priceUsd: { type: new GraphQLNonNull(GraphQLFloat) },
    priceUah: { type: new GraphQLNonNull(GraphQLFloat) },
    groupName: { type: new GraphQLNonNull(GraphQLString) },
    assignee: { type: GraphQLString },
    warrantyStart: { type: new GraphQLNonNull(GraphQLString) },
    warrantyEnd: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const OrderDetailsType = new GraphQLObjectType({
  name: 'OrderDetails',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    productCount: { type: new GraphQLNonNull(GraphQLInt) },
    totalPriceUsd: { type: new GraphQLNonNull(GraphQLFloat) },
    totalPriceUah: { type: new GraphQLNonNull(GraphQLFloat) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    products: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ProductType)),
      ),
    },
  },
});

const ProductListItemType = new GraphQLObjectType({
  name: 'ProductListItem',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    orderId: { type: new GraphQLNonNull(GraphQLString) },
    orderTitle: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    serialNumber: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(ProductTypeEnum) },
    specification: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    condition: { type: new GraphQLNonNull(GraphQLString) },
    priceUsd: { type: new GraphQLNonNull(GraphQLFloat) },
    priceUah: { type: new GraphQLNonNull(GraphQLFloat) },
    groupName: { type: new GraphQLNonNull(GraphQLString) },
    assignee: { type: GraphQLString },
    warrantyStart: { type: new GraphQLNonNull(GraphQLString) },
    warrantyEnd: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ProductsMetaType = new GraphQLObjectType({
  name: 'ProductsMeta',
  fields: {
    types: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ProductTypeEnum)),
      ),
    },
    specifications: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString)),
      ),
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    health: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => 'ok',
    },
    orders: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(OrderSummaryType)),
      ),
      resolve: () =>
        listOrders().map(
          ({
            id,
            title,
            productCount,
            totalPriceUsd,
            totalPriceUah,
            createdAt,
          }) => ({
            id,
            title,
            productCount,
            totalPriceUsd,
            totalPriceUah,
            createdAt,
          }),
        ),
    },
    order: {
      type: OrderDetailsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_root, args: { id: string }) => getOrderById(args.id) ?? null,
    },
    products: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ProductListItemType)),
      ),
      args: {
        type: { type: ProductTypeEnum },
        specification: { type: GraphQLString },
        search: { type: GraphQLString },
      },
      resolve: (
        _root,
        args: {
          type?: ProductType;
          specification?: string;
          search?: string;
        },
      ) => listProducts(args),
    },
    productsMeta: {
      type: new GraphQLNonNull(ProductsMetaType),
      resolve: () => ({
        types: productTypeOptions,
        specifications: specificationOptions,
      }),
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteOrder: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_root, args: { id: string }) =>
        deleteOrder(args.id) ? args.id : null,
    },
    deleteProduct: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_root, args: { id: string }) =>
        deleteProduct(args.id) ? args.id : null,
    },
  },
});

export const graphqlSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
