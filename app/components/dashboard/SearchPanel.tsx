import React from 'react';

export enum SortByType {
  DEPARTURE_TIME = 'departureTime',
  ARRIVAL_TIME = 'arrivalTime',
}

export enum SortOrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface SearchPanelProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: SortByType;
  setSortBy: (value: SortByType) => void;
  sortOrder: SortOrderType;
  setSortOrder: (value: SortOrderType) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
      <div className="w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search by train number or station..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="w-full md:w-1/2 flex gap-2">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortByType)}
          className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={SortByType.DEPARTURE_TIME}>Departure Time</option>
          <option value={SortByType.ARRIVAL_TIME}>Arrival Time</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrderType)}
          className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={SortOrderType.ASC}>Ascending</option>
          <option value={SortOrderType.DESC}>Descending</option>
        </select>
      </div>
    </div>
  );
};

export default SearchPanel;
