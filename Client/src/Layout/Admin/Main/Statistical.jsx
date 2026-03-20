import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { Table } from 'antd';
import axios from "axios";
import * as XLSX from 'xlsx';

const Dashboard = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/AdminStatisticalRouter/mainRankTable');
            setData(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const uniqueMonths = [...new Set(data.map(item => item.Month))];
    const uniqueYears = [...new Set(data.map(item => item.Year))];

    const groupedData = data.reduce((acc, curr) => {
        const key = `${curr.Year}-${curr.Month}-${curr.Day}`;
        if (!acc[key]) {
            acc[key] = {
                ...curr,
                Sum: curr.Sum,
            };
        } else {
            acc[key].Sum += curr.Sum;
        }
        return acc;
    }, {});

    const finalData = Object.values(groupedData).map(item => ({
        Day: item.Day,
        Month: item.Month,
        Year: item.Year,
        Sum: item.Sum,
    }));

    const columns = [
        {
            title: 'Date',
            dataIndex: 'Day',
            key: 'Day',
            render: (text) => new Date(text).toLocaleDateString('en-US'),
        },
        {
            title: 'Month',
            dataIndex: 'Month',
            key: 'Month',
            filters: uniqueMonths.map((item) => ({
                text: `Month: ${item}`,
                value: item
            })),
            onFilter: (value, record) => record.Month === value,
        },
        {
            title: 'Year',
            dataIndex: 'Year',
            key: 'Year',
            filters: uniqueYears.map((item) => ({
                text: `Year: ${item}`,
                value: item
            })),
            onFilter: (value, record) => record.Year === value,
        },
        {
            title: 'Total',
            dataIndex: 'Sum',
            key: 'Sum',
            render: (value) => value.toLocaleString('de-DE'),
            sorter: (a, b) => a.Sum - b.Sum,
            sortDirections: ['ascend', 'descend'],
        },
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalSumToday = data
        .filter(item => {
            const itemDay = new Date(item.Day);
            itemDay.setHours(0, 0, 0, 0);
            return itemDay.getTime() === today.getTime();
        })
        .reduce((total, item) => total + item.Sum, 0);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const totalSumYesterday = data
        .filter(item => {
            const itemDay = new Date(item.Day);
            itemDay.setHours(0, 0, 0, 0);
            return itemDay.getTime() === yesterday.getTime();
        })
        .reduce((total, item) => total + item.Sum, 0);


    const summaryData = [];
    function getFirstTwoDigits(num) {
        const numStr = Math.abs(num).toString().slice(0, 2);
        return num < 0 ? -parseInt(numStr) : parseInt(numStr);
    }

    summaryData.push({
        title: "Total today",
        value: totalSumToday.toLocaleString('de-DE'),
        change: getFirstTwoDigits(((totalSumToday - totalSumYesterday) / 1.0 * totalSumYesterday) * 100) + "%",
    });

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const totalSumThisMonth = data
        .filter(item => item.Month === currentMonth && item.Year === currentYear)
        .reduce((total, item) => total + item.Sum, 0);

    const currentDate = new Date();
    const lastMonth = currentDate.getMonth();
    const lastMonthYear = currentDate.getFullYear();

    const monthBefore = lastMonth === 0 ? 12 : lastMonth;
    const yearBefore = lastMonth === 0 ? lastMonthYear - 1 : lastMonthYear;

    const totalSumLastMonth = data
        .filter(item => item.Month === monthBefore && item.Year === yearBefore)
        .reduce((total, item) => total + item.Sum, 0);

    summaryData.push({
        title: "Total this month",
        value: totalSumThisMonth.toLocaleString('de-DE'),
        change: getFirstTwoDigits(((totalSumThisMonth - totalSumLastMonth) / 1.0 * totalSumLastMonth) * 100) + "%",
    });

    const totalSumAll = data.reduce((total, item) => total + item.Sum, 0);

    summaryData.push({
        title: "Total of all",
        value: totalSumAll.toLocaleString('de-DE'),
        change: "",
    });

    function getLineChartData(year) {
        const filteredData = data.filter(item => item.Year === year);

        const groupedData = filteredData.reduce((acc, item) => {
            const month = item.Month;
            const payment = item.Payment;

            if (!acc[month]) {
                acc[month] = { 'Direct': 0, 'Online': 0 };
            }

            acc[month][payment] += item.Sum;
            return acc;
        }, {});

        const lineChartData = Object.keys(groupedData).map(month => {
            return {
                Month: `Month ${month}`,
                "Direct": groupedData[month]['Direct'],
                "Online": groupedData[month]['Online'],
            };
        });

        return lineChartData;
    }

    function getTotalByYear(year) {
        const filteredData = data.filter(item => item.Year === year);

        const groupedByMonth = filteredData.reduce((acc, item) => {
            const month = item.Month;
            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month] += item.Sum;
            return acc;
        }, {});

        return Array.from({ length: 12 }, (_, i) => {
            const month = i + 1;
            return {
                Month: `Month ${month}`,
                value: groupedByMonth[month] || 0,
            };
        });
    }

    const now = new Date();
    const [yearToFilter, setYearToFilter] = useState(now.getFullYear());
    const barChartData = getTotalByYear(yearToFilter);
    const lineChartData = getLineChartData(yearToFilter);

    const [filteredData, setFilteredData] = useState(data);

    const handleTableChange = (pagination, filters) => {
        const filtered = data.filter(item => {
            if (filters.Month && filters.Month.length > 0) {
                return filters.Month.includes(item.Month);
            }
            return true;
        });
        setFilteredData(filtered);
    };

    const handleDownload = () => {
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(filteredData.length === 0 ? finalData : filteredData), 'Sheet1');
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(barChartData), 'Sheet2');
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(lineChartData), 'Sheet3');
        XLSX.writeFile(wb, 'data.xlsx');
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Grid container spacing={3} style={{ marginBottom: "1rem" }}>
                {summaryData.map((item, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="h4">{item.value}</Typography>
                                <Typography
                                    variant="subtitle1"
                                    color={item.change.includes("-") ? "error" : "success"}
                                >
                                    {item.change}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button onClick={handleDownload} style={{ marginBottom: 16 }}>Export Excel File</Button>
            <Table
                dataSource={finalData}
                onChange={handleTableChange}
                columns={columns}
                rowKey="Day"
            />
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Year</InputLabel>
                        <Select
                            value={yearToFilter}
                            onChange={(e) => setYearToFilter(e.target.value)}
                            label="Year"
                        >
                            {uniqueYears.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Product Comparison</Typography>
                            <BarChart width={1200} height={300} data={barChartData}>
                                <XAxis dataKey="Month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Revenue Trends</Typography>
                            <LineChart width={1200} height={300} data={lineChartData}>
                                <XAxis dataKey="Month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="Direct" stroke="#8884d8" />
                                <Line type="monotone" dataKey="Online" stroke="#82ca9d" />
                            </LineChart>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
