import React from 'react'

type TableProps<T> = {
  data: T[];
  onRowActionClick: (row: T, action: 'edit' | 'delete') => void;
  columns: {
    title: string;
    accessor: keyof T;
    onClick?: boolean;
  }[];
};

const Table = <T extends Record<string, any>>({
  data,
  onRowActionClick,
  columns,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.title}
              </th>
            ))}
            <th
              scope="col"
              className="w-1/4 px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider"
            >

            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={`w-1/3 px-6 py-4 ${column.onClick ? 'cursor-pointer' : ''
                    } whitespace-normal`}
                  onClick={() =>
                    column.onClick
                      ? onRowActionClick(row, 'edit')
                      : () => { }
                  }
                >
                  <div className="break-words">
                    {row[column.accessor]}
                  </div>
                </td>
              ))}
              <td className="w-1/4 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onRowActionClick(row, 'delete')}
                  className="bg-black hover:bg-black-700 text-white font-bold py-2 px-4 rounded m-0"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;