import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
import TextAndIcon from '@/components/table-cells/text-and-icon/text-and-icon';
import { BusinessUserIcon, EnvelopeIcon, PencilIcon, PhoneIcon, PrivateUserIcon, UsersGroupIcon } from '@/assets';
import Actions from '@/components/customers-table/actions';

// Define the customer type
export interface Customer {
  customerName: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
}

const columnHelper = createColumnHelper<Customer>();

// Example: you can set customerType dynamically
const customerType: 'business' | 'private' = 'private'; // or 'private'

type MyColumnMeta = { isHidden?: boolean };

const columns = [
  columnHelper.accessor('customerName', {
    header: 'Customer Name',
    cell: (info) => <TextAndIcon icon={<BusinessUserIcon />} title={info.getValue()} subTitle={customerType} />,
    meta: { isHidden: customerType === 'private' },
  }),
  columnHelper.accessor('customerId', {
    header: 'Customer ID',
    cell: (info) => info.getValue(),
    meta: { isHidden: customerType === 'private' },
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (info) => <TextAndIcon icon={<PrivateUserIcon />} title={info.getValue()} />,
    meta: { isHidden: customerType !== 'private' },
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: (info) => info.getValue(),
    meta: { isHidden: customerType !== 'private' },
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => <TextAndIcon icon={<EnvelopeIcon />} title={info.getValue()} />,
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone Number',
    cell: (info) => <TextAndIcon icon={<PhoneIcon />} title={info.getValue()} />,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <Actions
        actions={[
          { icon: <UsersGroupIcon />, onClick: () => {} },
          { icon: <PencilIcon />, onClick: () => {} },
        ]}
      />
    ),
  }),
];

// Filter out hidden columns
const visibleColumns = columns.filter((col) => !(col.meta as MyColumnMeta)?.isHidden);

const CustomersTable = (data: { data: Array<Customer> }) => {
  const table = useReactTable({
    data: data.data,
    columns: visibleColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border-b px-4 py-2 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-b px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
