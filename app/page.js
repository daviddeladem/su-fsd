'use client';

import { useEffect, useState } from 'react';


const fetchItems = async () => {
  const res = await fetch('/api/items');
  const data = await res.json();
  return data;
};

export default function Home() {
  const [items, setItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt-asc');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchItems();
      setItems(data);
      setSortedItems(data);
    };
    loadData();
  }, []);

  useEffect(() => {
    const sortItems = () => {
      const sorted = [...items];

      if (sortBy === 'createdAt-asc') {
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortBy === 'filename-asc') {
        sorted.sort((a, b) => naturalSort(a.filename, b.filename));
      } else if (sortBy === 'filename-desc') {
        sorted.sort((a, b) => naturalSort(b.filename, a.filename));
      }

      setSortedItems(sorted);
    };

    sortItems();
  }, [sortBy, items]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const naturalSort = (a, b) => {
    if (a === undefined || b === undefined) {
      return 0; 
    }

    return a.replace(/\d+/g, n => +n).localeCompare(b.replace(/\d+/g, n => +n), undefined, { numeric: true });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Item List</h1>

      <div className="my-4 p-4 border-1 border-gray-200">
        <label htmlFor="sort" className="mr-2">Sort By:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="createdAt-asc">Created At (Asc)</option>
          <option value="filename-asc">Filename (Asc)</option>
          <option value="filename-desc">Filename (Desc)</option>
        </select>
      </div>

      
      <div className="grid grid-cols-2 gap-4">
        {sortedItems.map((item, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded shadow">
            <p className="text-sm font-semibold">Created At:</p>
            <p>{item.createdAt}</p>
            <p className="mt-2 text-sm font-semibold">Filename:</p>
            <p>{item.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
