import { useLayoutEffect, useMemo } from "react";
import styled from "styled-components";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import { Pokemon } from "../../../redux/api/models/Pokemon";

const StyledDiv = styled.div`
  min-width: 300px;
  min-height: 500px;
  @media (min-width: 768px) {
    min-width: 800px;
    min-height: 500px;
  }
`;

export type ComparisonChartProps = {
  pokemonToCompare: Pokemon[];
};

type ParsedDataType = {
  category: string;
  value: number;
};

export const ComparisonChart = ({ pokemonToCompare }: ComparisonChartProps) => {
  const parsedData: ParsedDataType[][] = useMemo(() => {
    return pokemonToCompare.map((pokemon) =>
      pokemon.stats.map((stat) => ({
        category: stat.stat.name,
        value: stat.base_stat,
      }))
    );
  }, [pokemonToCompare]);

  useLayoutEffect(() => {
    let root = am5.Root.new("ComparisonChart");

    let chart = root.container.children.push(am5radar.RadarChart.new(root, {}));

    // Create axes
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5radar.AxisRendererCircular.new(root, {}),
        categoryField: "category",
      })
    );

    xAxis.data.setAll(parsedData[0]);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5radar.AxisRendererRadial.new(root, {}),
      })
    );

    // Create series
    let series1 = chart.series.push(
      am5radar.RadarLineSeries.new(root, {
        name: pokemonToCompare[0].name.toUpperCase(),
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        tooltip: am5.Tooltip.new(root, {}),
        categoryXField: "category",
      })
    );
    series1.get("tooltip")?.label.set("text", pokemonToCompare[0].name);
    series1.data.setAll(parsedData[0]);

    let series2 = chart.series.push(
      am5radar.RadarLineSeries.new(root, {
        name: pokemonToCompare[1].name.toUpperCase(),
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        tooltip: am5.Tooltip.new(root, {}),
        categoryXField: "category",
        fill: am5.color(0xf05256),
        stroke: am5.color(0xf05256),
      })
    );
    series2.get("tooltip")?.label.set("text", pokemonToCompare[1].name);
    series2.data.setAll(parsedData[1]);

    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    chart.set("cursor", am5radar.RadarCursor.new(root, {}));

    xAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    yAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    return () => {
      root.dispose();
    };
  }, []);

  return <StyledDiv id="ComparisonChart"></StyledDiv>;
};
