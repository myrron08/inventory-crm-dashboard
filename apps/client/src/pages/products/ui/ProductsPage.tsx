import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { ProductTable } from '@/widgets/product-table/ProductTable';
import { Select } from '@/shared/ui/Select/Select';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import {
  fetchProducts,
  fetchProductsMeta,
  selectProducts,
  selectProductsFilters,
  selectProductsListStatus,
  selectProductsMeta,
  setProductSearchFilter,
  setProductSpecificationFilter,
  setProductTypeFilter,
} from '@/entities/product/model/productsSlice';
import { selectGlobalSearchQuery } from '@/features/global-search/model/searchSlice';
import { openDeleteProductModal } from '@/features/delete-entity/model/deleteModalSlice';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { productTypeFilterOptions } from '@/shared/lib/labels/productLabels';
import type { ProductType } from '@/shared/types/domain';
import { ProductTableSkeleton } from '@/shared/ui/Skeleton/ProductTableSkeleton';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import './ProductsPage.scss';

const filtersSchema = z.object({
  type: z.string(),
  specification: z.string(),
});

type FiltersForm = z.infer<typeof filtersSchema>;

type ProductSort = 'default' | 'price-asc' | 'price-desc' | 'name';

export const ProductsPage = memo(function ProductsPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [sort, setSort] = useState<ProductSort>('default');
  const meta = useAppSelector(selectProductsMeta);
  const listStatus = useAppSelector(selectProductsListStatus);
  const filters = useAppSelector(selectProductsFilters);
  const globalSearch = useAppSelector(selectGlobalSearchQuery);
  const debouncedSearch = useDebouncedValue(globalSearch, 300);

  const { register, control } = useForm<FiltersForm>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      type: filters.type,
      specification: filters.specification,
    },
  });

  const watched = useWatch({ control });

  useEffect(() => {
    void dispatch(fetchProductsMeta());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProductTypeFilter((watched.type ?? '') as ProductType | ''));
    dispatch(setProductSpecificationFilter(watched.specification ?? ''));
  }, [dispatch, watched.specification, watched.type]);

  useEffect(() => {
    dispatch(setProductSearchFilter(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    void dispatch(fetchProducts());
  }, [dispatch, filters.type, filters.specification, filters.search]);

  const typeOptions = [
    { value: '', label: 'Все типы' },
    ...productTypeFilterOptions.map((option) => ({
      value: option.value,
      label: option.label,
    })),
  ];

  const specificationOptions = [
    { value: '', label: 'Все спецификации' },
    ...(meta?.specifications ?? []).map((item) => ({
      value: item,
      label: item,
    })),
  ];

  const sortedProducts = useMemo(() => {
    const copy = [...products];
    switch (sort) {
      case 'price-asc':
        return copy.sort((a, b) => a.priceUsd - b.priceUsd);
      case 'price-desc':
        return copy.sort((a, b) => b.priceUsd - a.priceUsd);
      case 'name':
        return copy.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
      default:
        return copy;
    }
  }, [products, sort]);

  const sortOptions = [
    { value: 'default', label: 'Как в API' },
    { value: 'price-asc', label: 'Цена ↑' },
    { value: 'price-desc', label: 'Цена ↓' },
    { value: 'name', label: 'Название А–Я' },
  ];

  return (
    <section className="page-section products-page">
      <header className="page-header">
        <h1 className="page-header__title">
          Продукты{' '}
          <span className="page-header__count">/ {products.length}</span>
        </h1>
      </header>

      <div className="products-page__filters">
        <Select label="Тип" options={typeOptions} {...register('type')} />
        <Select
          label="Спецификация"
          options={specificationOptions}
          {...register('specification')}
        />
        <Select
          label="Сортировка"
          options={sortOptions}
          value={sort}
          onChange={(event) => {
            setSort(event.target.value as ProductSort);
          }}
        />
      </div>

      {listStatus === 'loading' && products.length === 0 ? (
        <ProductTableSkeleton />
      ) : null}

      {listStatus === 'failed' ? (
        <EmptyState
          title="Не удалось загрузить продукты"
          description="Проверьте API и повторите попытку."
        />
      ) : null}

      {listStatus !== 'loading' && products.length === 0 ? (
        <EmptyState
          title="Продукты не найдены"
          description="Измените фильтры или строку поиска."
        />
      ) : null}

      {products.length > 0 ? (
        <ProductTable
          products={sortedProducts}
          onDelete={(product, event) => {
            event.stopPropagation();
            dispatch(
              openDeleteProductModal({
                productId: product.id,
                product,
              }),
            );
          }}
        />
      ) : null}
    </section>
  );
});
