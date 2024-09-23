import { evaluateRanking } from '../../services/ranking';
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
        {tableData.map((row) => {
          const { feat, ...values } = row;

          const best = evaluateRanking(Object.values(values) as string[], feat);
          // console.log(feat, best);
          return (
            <Table.Tr key={feat}>
              <Table.Td>{feat}</Table.Td>
              {headers.map((header) => (
                <Table.Td key={header}>
                  {(() => {
                    let rowData = values[header] as
                      | boolean
                      | string
                      | undefined;

                    rowData = rowData ?? 'N/A';

                    if (rowData === best) {
                      if (typeof rowData === 'boolean') {
                        rowData = rowData ? 'Yes' : 'No';
                      }

                      return (
                        <strong className="px-2 py-1 bg-green-500 text-black rounded">
                          {rowData}
                        </strong>
                      );
                    }

                    if (typeof rowData === 'boolean') {
                      rowData = rowData ? 'Yes' : 'No';
                    }

                    return rowData;
                  })()}
                </Table.Td>
              ))}
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
    // </Table.ScrollContainer>
  );
};
