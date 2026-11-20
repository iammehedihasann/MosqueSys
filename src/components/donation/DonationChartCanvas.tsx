import { useEffect, useRef } from "react";
import { BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip } from "chart.js";
import { formatDonationMoney, type DonationReportMonth } from "@/utils/donationReport";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

type MonthlyChart = Chart<"bar", (number | null)[], string>;

export default function DonationChartCanvas({
  months,
  currency,
}: {
  months: readonly DonationReportMonth[];
  currency: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<MonthlyChart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const chart = new Chart<"bar", (number | null)[], string>(canvas, {
      type: "bar",
      data: { labels: [], datasets: [] },
      options: {
        indexAxis: "x",
        responsive: true,
        maintainAspectRatio: false,
        skipNull: true,
        animation: false,
        color: "#14231F",
        font: { family: '"Noto Sans Bengali", system-ui, sans-serif' },
        interaction: { mode: "index", intersect: false },
        scales: {
          x: {
            grid: { display: false },
            ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 },
          },
          y: {
            beginAtZero: true,
            grid: { color: "#E3ECE6" },
            ticks: { maxTicksLimit: 5 },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (item) => `${item.dataset.label}: ${formatDonationMoney(item.parsed.y, currency)}`,
            },
          },
        },
      },
    });
    chartRef.current = chart;

    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, [currency]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    chart.data.labels = months.map((month) => month.month);
    chart.data.datasets = [
      {
        label: "আয়",
        data: months.map((month) => month.collected),
        backgroundColor: "#1E5B4C",
        borderRadius: 3,
      },
      {
        label: "ব্যয়",
        data: months.map((month) => month.expense),
        backgroundColor: "#B5892D",
        borderRadius: 3,
      },
    ];
    chart.update();
  }, [months, currency]);

  return (
    <div className="max-h-[30rem] overflow-y-auto">
      <div className="relative" style={{ height: Math.max(260, months.length * 48 + 60) }}>
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
    </div>
  );
}
