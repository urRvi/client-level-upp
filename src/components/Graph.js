import React, { useEffect, useState } from "react";

import { Doughnut } from "react-chartjs-2";

import { Chart, ArcElement } from "chart.js";

import Labels from "./Labels";

import { chart_Data, getTotal } from "../helper/helper";

import axios from "axios";

Chart.register(ArcElement);

const categoryColors = {
  Investment: "#1abc9c", // Greenish
  Expense: "#e74c3c", // Reddish
  Savings: "#3498db", // Bluish
};

export default function Graph() {
  const [data, setData] = useState([]);

  const [isFetching, setIsFetching] = useState(true);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);

        const response = await axios.get(
          "http://localhost:8080/api/transaction"
        );

        // Map data to include colors for categories
        const chartData = response.data.map((item) => ({
          ...item,
          color: categoryColors[item.type], // Default color if category doesn't match
        }));

        setData(chartData);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsFetching(true);

  //       const response = await axios.get(
  //         "http://localhost:8080/api/transaction",
  //         {}
  //       );

  //       setData(response.data);
  //     } catch (error) {
  //       setIsError(true);

  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setIsFetching(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  let graphData;

  if (isFetching) {
    graphData = <div>Fetching...</div>;
  } else if (data.length > 0) {
    graphData = <Doughnut {...chart_Data(data)} />;
  } else if (isError) {
    graphData = <div>Error loading data</div>;
  } else {
    graphData = <div>No data available</div>;
  }

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {graphData}

          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">
            ₹{getTotal(data) ?? 0}
            </span>
          </h3>
        </div>

        <div className="flex flex-col py-10 gap-4">
          <Labels />
        </div>
      </div>
    </div>
  );
}
