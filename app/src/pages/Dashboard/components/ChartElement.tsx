import { useEffect, useRef, useState } from 'react';
import { chartData } from '../../../mocks/data';
import {
	Chart,
	LineController,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
	Legend,
	Title,
	Tooltip,
} from 'chart.js';
import useTheme from '../../../hooks/useTheme';

Chart.register(
	LineController,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
	Title,
	Legend,
	Tooltip
);

function ChartElement() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const chartRef = useRef<Chart>(null);
	const [data, setData] = useState(chartData);
	const { isDark } = useTheme();

	useEffect(() => {
		if (canvasRef.current) {
			chartRef.current = new Chart(canvasRef.current, {
				type: 'line',
				data: {
					labels: [
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
						'August',
						'September',
						'October',
						'November',
						'Desember',
					],
					datasets: [
						{
							label: 'Unresolved',
							data: data.unresolved,
							borderColor: isDark ? 'rgb(250 0 0)' : 'rgb(147 0 0)',
						},
						{
							label: 'Resolved',
							data: data.resolved,
							borderColor: isDark ? 'rgb(0 206 21)' : 'rgb(0 120 12)',
						},
						{
							label: 'Open',
							data: data.open,
							borderColor: isDark ? 'rgb(98 142 255)' : 'rgb(0 39 136)',
						},
						{
							label: 'On Hold',
							data: data.onHold,
							borderColor: isDark ? 'rgb(255 229 0)' : 'rgb(191 93 2)',
						},
					],
				},
				options: {
					interaction: {
						mode: 'index',
					},
					plugins: {
						title: {
							display: true,
							color: isDark ? 'rgb(255 255 255)' : 'rgb(0 0 0)',
							text: 'Number of tickets last year',
							align: 'start',
							font: {
								size: 18,
							},
						},
						legend: {
							labels: {
								color: isDark ? 'rgb(255 255 255)' : 'rgb(0 0 0)',
							},
							position: 'bottom',
						},
						tooltip: {
							mode: 'index',
							intersect: false,
						},
					},
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						y: {
							ticks: {
								color: isDark ? 'rgb(221 221 221)' : 'rgb(112 112 112)',
							},
						},
						x: {
							ticks: {
								color: isDark ? 'rgb(221 221 221)' : 'rgb(112 112 112)',
							},
						},
					},
				},
			});
		}

		return () => {
			if (chartRef.current) {
				chartRef.current.destroy();
				chartRef.current = null;
			}
		};
	}, [isDark, data]);
	
	return <canvas aria-label='Chart' role='img' ref={canvasRef}></canvas>;
}

export default ChartElement;
