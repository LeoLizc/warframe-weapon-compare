import { type WeaponModeData } from '../../types/weapons';
import { invertGroup } from '../../utils/group';
import { Table } from '@mantine/core';

interface TableSectionProperties {
  data: WeaponModeData[];
}

export const TableSection = ({ data }: TableSectionProperties) => {
  const tableData = invertGroup({ data, key: 'name', newKey: 'feat' });

  const headers = data.map(({ name }) => name);

  // console.log(headers);

  return (
    // <Table.ScrollContainer minWidth={300}>
    <Table
      highlightOnHover
      // horizontalSpacing="md"
      stickyHeader
      stickyHeaderOffset={6}
      striped
      verticalSpacing="sm"
      withColumnBorders
      withRowBorders={false}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Mode</Table.Th>
          {headers.map((header) => (
            <Table.Th key={header}>{header}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {tableData.map((row) => (
          <Table.Tr key={row.feat}>
            <Table.Td>{row.feat}</Table.Td>
            {headers.map((header) => (
              <Table.Td key={header}>
                {(() => {
                  const rowData = row[header] as boolean | string | undefined;
                  if (typeof rowData === 'boolean') {
                    return rowData ? 'Yes' : 'No';
                  }

                  return rowData ?? 'N/A';
                })()}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
    // </Table.ScrollContainer>
  );
};
