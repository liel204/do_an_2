import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import axios from "axios"
import { Button, Table } from 'antd';
import * as XLSX from 'xlsx';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/AdminStatisticalRouter/userRankTable');
            setData(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Create User',
            dataIndex: 'CreateUser',
            key: 'CreateUser',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Total amount spent',
            dataIndex: 'Sum',
            key: 'Sum',
            render: (value) => value.toLocaleString('vi'),
            sorter: (a, b) => a.Sum - b.Sum,
            sortDirections: ['ascend', 'descend'],
        },
    ];

    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const yesterdayDateString = yesterday.toISOString().split('T')[0];

    const filteredyesterday = data.filter((item) => {
        const itemDateString = new Date(item.CreateUser).toISOString().split('T')[0];
        return itemDateString === yesterdayDateString;
    });

    const today = new Date().toISOString().split('T')[0];

    const filteredDay = data.filter((item) => {
        const itemDate = item.CreateUser.split('T')[0];
        return itemDate === today;
    });

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const filteredMonth = data.filter((item) => {
        const createDate = new Date(item.CreateUser);
        const createMonth = createDate.getMonth();
        const createYear = createDate.getFullYear();
        return createMonth === currentMonth && createYear === currentYear;
    });


    const filteredYear = data.filter((item) => {
        const createYear = new Date(item.CreateUser).getFullYear();
        return createYear === currentYear;
    });

    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    const filteredlastMonthDate = data.filter((item) => {
        const createDate = new Date(item.CreateUser);
        const createMonth = createDate.getMonth();
        const createYear = createDate.getFullYear();
        return createMonth === lastMonth && createYear === lastMonthYear;
    });

    const lastYear = now.getFullYear() - 1;

    const filteredlastYear = data.filter((item) => {
        const createDate = new Date(item.CreateUser);
        const createYear = createDate.getFullYear();
        return createYear === lastYear;
    });

    const summaryData = [];

    summaryData.push({ title: "Account Created Today", value: filteredDay.length, change: (((filteredDay.length - filteredyesterday.length) / 1.0 * filteredyesterday.length) * 100).toString() + "%" })
    summaryData.push({ title: "Accounts Created This Month", value: filteredMonth.length, change: (((filteredMonth.length - filteredlastMonthDate.length) / 1.0 * filteredlastMonthDate.length) * 100).toString() + "%" })
    summaryData.push({ title: "Accounts Created This Year", value: filteredYear.length, change: (((filteredYear.length - filteredlastYear.length) / 1.0 * filteredlastYear.length) * 100).toString() + "%" })
    summaryData.push({ title: "All Accounts", value: data.length, change: "" })


    const createBarChartData = (data, year) => {
        const monthsData = Array(12).fill(0);

        data.forEach(item => {
            const createDate = new Date(item.CreateUser);
            const createYear = createDate.getFullYear();
            const createMonth = createDate.getMonth();

            if (createYear === year) {
                monthsData[createMonth]++;
            }
        });

        const barChartData = monthsData.map((value, index) => ({
            Month: (index + 1).toString(),
            "Total Account": value
        }));

        return barChartData;
    };

    const [yearToFilter, setYearToFilter] = useState(now.getFullYear())
    const barChartData = createBarChartData(data, yearToFilter);
    const uniqueYears = [...new Set(data.map(item => new Date(item.CreateUser).getFullYear()))];

    const handleDownload = async () => {
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(barChartData), `Year_${yearToFilter}`);
        XLSX.writeFile(workbook, "data.xlsx");
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Grid container spacing={3} style={{ marginBottom: "1rem" }}>
                {summaryData.map((item, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="h4">{item.value}</Typography>
                                <Typography variant="subtitle1" style={{ fontWeight: 550 }} color={item.change.includes("-") ? "error" : "blue"}>
                                    {item.change}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Table columns={columns} dataSource={data} rowKey="Email" />;
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Button onClick={handleDownload} style={{ marginBottom: 16 }}>Export Excel File</Button>
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
                                <Bar dataKey="Total Account" fill="#8884d8" />
                            </BarChart>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
