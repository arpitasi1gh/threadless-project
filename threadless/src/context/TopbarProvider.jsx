import React, { useState, useContext, useMemo } from 'react';
import { DataContext } from './DataContext';
import { TopbarContext } from './TopbarContext';

const FILTER_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Trending', label: 'Trending' },
  { value: 'Featured', label: 'Featured' },
  { value: 'Popular', label: 'Popular' },
  { value: 'New', label: 'New' },
  { value: 'On Sale', label: 'On Sale' }
];

const SORT_OPTIONS = [
  { value: 'Price:LowToHigh', label: 'Price (Low to High)' },
  { value: 'Price:HighToLow', label: 'Price (High to Low)' },
  { value: 'Name:AtoZ', label: 'Name (A to Z)' },
  { value: 'Name:ZtoA', label: 'Name (Z to A)' }
];

const FILTER_TAG_MAP = {
  Trending: 'trending',
  Featured: 'featured',
  Popular: 'popular',
  New: 'new',
  'On Sale': 'on-sale'
};

const getMinPrice = (item) => {
  const prices = item?.products?.flatMap((product) => product?.variants?.map((variant) => variant?.price) ?? []) ?? [];
  const numericPrices = prices.filter((price) => typeof price === 'number');
  if (numericPrices.length === 0) return Number.POSITIVE_INFINITY;
  return Math.min(...numericPrices);
};

const TopbarProvider = ({ children }) => {
  const { items } = useContext(DataContext);
  
  const [sortBy, setSortBy] = useState('Price:LowToHigh');
  const [filterBy, setFilterBy] = useState('All');

  const filterOptions = FILTER_OPTIONS;
  const sortOptions = SORT_OPTIONS;

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Single tag filter
    if (filterBy !== 'All') {
      const tag = FILTER_TAG_MAP[filterBy];
      if (tag) {
        result = result.filter((item) => item?.design?.tags?.includes(tag));
      }
    }

  // Sort logic
  switch (sortBy) {
    case 'Price:LowToHigh':
      result.sort((a, b) => getMinPrice(a) - getMinPrice(b));
      break;
    case 'Price:HighToLow':
      result.sort((a, b) => getMinPrice(b) - getMinPrice(a));
      break;
    case 'Name:AtoZ':
      result.sort((a, b) => (a?.design?.title || '').localeCompare(b?.design?.title || ''));
      break;
    case 'Name:ZtoA':
      result.sort((a, b) => (b?.design?.title || '').localeCompare(a?.design?.title || ''));
      break;
    default:
      break;
  }

    return result;
  }, [items, filterBy, sortBy]);

  const totalCount = filteredItems.length;
  const allCount = items.length;

  return (
    <TopbarContext.Provider value={{
      sortBy,
      setSortBy,
      filterBy,
      setFilterBy,
      filteredItems,
      totalCount,
      allCount,
      filterOptions,
      sortOptions
    }}>
      {children}
    </TopbarContext.Provider>
  );
};

export default TopbarProvider;
