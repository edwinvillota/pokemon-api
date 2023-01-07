import { useLayoutEffect, useMemo } from "react";
import { Pokemon } from "../../redux/api/models/Pokemon";
import styled from "styled-components";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export type StatsChartProps = {
  stats: Pokemon["stats"];
};

const StyledDiv = styled.div`
  display: flex;
  min-width: 300px;
  min-height: 300px;
`;

type ParsedStatType = {
  category: string;
  value: number;
};

export const StatsChart = ({ stats }: StatsChartProps) => {
  const parsedStats: ParsedStatType[] = useMemo(() => {
    return stats.map((stat) => ({
      category: stat.stat.name,
      value: stat.base_stat,
    }));
  }, [stats]);

  useLayoutEffect(() => {
    let root = am5.Root.new("statsChartDiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      })
    );

    let data = parsedStats;

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "category",
      })
    );
    xAxis.data.setAll(data);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
      })
    );

    series1.data.setAll(data);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, []);

  return <StyledDiv id="statsChartDiv" />;
};
