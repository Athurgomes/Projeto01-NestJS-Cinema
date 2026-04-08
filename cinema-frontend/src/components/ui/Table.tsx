import React from 'react';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table: React.FC<TableProps> & {
  Head: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  Body: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  Row: React.FC<React.HTMLAttributes<HTMLTableRowElement>>;
  Th: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>>;
  Td: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>>;
} = ({ children, className = '', ...props }) => (
  <div className="w-full overflow-x-auto rounded-lg border border-border">
    <table className={`w-full text-left text-sm text-text-main ${className}`} {...props}>
      {children}
    </table>
  </div>
);

Table.Head = ({ children, className = '', ...props }) => (
  <thead className={`bg-elevated text-text-muted text-xs uppercase ${className}`} {...props}>
    {children}
  </thead>
);

Table.Body = ({ children, className = '', ...props }) => (
  <tbody className={`divide-y divide-border bg-surface ${className}`} {...props}>
    {children}
  </tbody>
);

Table.Row = ({ children, className = '', ...props }) => (
  <tr className={`hover:bg-elevated transition-colors ${className}`} {...props}>
    {children}
  </tr>
);

Table.Th = ({ children, className = '', ...props }) => (
  <th className={`px-6 py-4 font-medium ${className}`} {...props}>
    {children}
  </th>
);

Table.Td = ({ children, className = '', ...props }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
    {children}
  </td>
);