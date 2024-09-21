import { invertGroup } from '../../utils/group';
import { standardize } from '../../utils/standart';
import { RadarChart } from '@mantine/charts';
import { useMemo } from 'preact/hooks';

interface Props {
  data: Array<{
    color: string;
    data: { [key: string]: number };
    weapon: string;
  }>;
  description: string;
  title: string;
}

export const RadarSection = ({ data = [], description, title }: Props) => {
  const transformedData = useMemo(
    () => [
      ...invertGroup({
        data: [...data]
          .slice(0, 6)
          .map((item) => ({ ...item.data, weapon: item.weapon })),
        key: 'weapon',
        mapGroup: (item) => standardize(item as Record<string, number>),
        newKey: 'category',
      }),
    ],
    [data],
  );

  const series = useMemo(
    () =>
      data.map((item) => ({
        color: item.color,
        name: item.weapon,
        opacity: 0.1,
      })),
    [data],
  );

  // console.log('series', series);

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <RadarChart
        data={transformedData}
        dataKey="category"
        gridColor="grey"
        h={300}
        label="test Label"
        series={series}
        withPolarGrid
        withPolarRadiusAxis={false}
      />
    </div>
  );
};
