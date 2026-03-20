import React, { useState, useEffect } from "react";
import { Grid, CardContent, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Button, Card, Table } from "antd";
import axios from "axios";
import * as XLSX from 'xlsx';

const Dashboard = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/AdminStatisticalRouter/categoryRankTable');
            setData(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const years = [...new Set(data.map(item => item.Year))];
    const months = [...new Set(data.map((item) => item.Month))];

    const yearsSort = years.sort((a, b) => a - b)
    const monthsSort = months.sort((a, b) => a - b)

    const yearsFilters = yearsSort.map((item) => ({
        text: item,
        value: item,
    }));

    const monthsFilters = monthsSort.map((item) => ({
        text: item,
        value: item,
    }));


    const [selectedYear, setSelectedYear] = useState(years[0]);

    const filteredData = data.filter(item => item.Year === selectedYear);

    const result = filteredData.reduce((acc, item) => {
        const key = `${item.Year}-${item.Month}`;
        if (!acc[key]) {
            acc[key] = { Year: item.Year, Month: item.Month, TotalPriceByCategory: 0 };
        }
        acc[key].TotalPriceByCategory += item.TotalPriceByCategory;
        return acc;
    }, {});

    const groupedData = Object.values(result);

    const transformedData = groupedData.map(item => ({
        name: `${item.Month}-${item.Year}`,
        'Revenue': item.TotalPriceByCategory,
    }));

    const sortedData = transformedData.sort((a, b) => {
        const [monthA, yearA] = a.name.split('-');
        const [monthB, yearB] = b.name.split('-');
        if (yearA !== yearB) return yearA - yearB;
        return monthA - monthB;
    });

    const uniqueMonths = [...new Set(filteredData.map(item => item.Month))].sort((a, b) => a - b);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };


    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'Category_Name',
            key: 'Category_Name',
        },
        {
            title: 'Year',
            dataIndex: 'Year',
            key: 'Year',
            filters: yearsFilters,
            onFilter: (value, record) => record.Year === value,
        },
        {
            title: 'Month',
            dataIndex: 'Month',
            key: 'Month',
            filters: monthsFilters,
            onFilter: (value, record) => record.Month === value,
        },
        {
            title: 'Total Price By Category',
            dataIndex: 'TotalPriceByCategory',
            key: 'TotalPriceByCategory',
            render: (text) => {
                return text.toLocaleString();
            },
        },
        {
            title: 'Total Product Count',
            dataIndex: 'TotalProductCount',
            key: 'TotalProductCount',
        },
    ];

    const [filteredDataExport, setfilteredDataExport] = useState(data);

    const handleTableChange = (pagination, filters) => {
        const filtered = data.filter(item => {
            if (filters.Month && filters.Month.length > 0) {
                return filters.Month.includes(item.Month);
            }
            return true;
        });
        setfilteredDataExport(filtered);
    };


    const handleDownload = async () => {
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(filteredDataExport.length === 0 ? data : filteredDataExport), 'Sheet1');
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(sortedData), 'Sheet2');
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(filteredData), 'Sheet3');
        XLSX.writeFile(workbook, "data.xlsx");
    };

    const handlePieChart = async () => {
        const workbook = XLSX.utils.book_new();
        for (const month of uniqueMonths) {
            const filteredItems = filteredData.filter(item => item.Month === month);
            if (filteredItems.length > 0) {
                const sheet = XLSX.utils.json_to_sheet(filteredItems);
                XLSX.utils.book_append_sheet(workbook, sheet, `Month_${month}`);
            }
        }
        XLSX.writeFile(workbook, "data.xlsx");
    };


    return (
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Button onClick={handleDownload} style={{ marginBottom: 16 }}>Export Excel File</Button>
            <Card style={{ margin: "20px 0" }}>
                <Typography level={4}>Revenue Trend</Typography>
                <Table
                    onChange={handleTableChange}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            </Card>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <InputLabel>Year</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            value={selectedYear}
                            onChange={handleYearChange}
                            label="Year"
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Revenue Trend</Typography>
                            <LineChart width={1200} height={400} data={sortedData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Line type="monotone" dataKey="Revenue" stroke="#8884d8" name="Revenue" />
                            </LineChart>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handlePieChart} style={{ marginBottom: 16 }}>Export Excel File</Button>
                </Grid>
                {uniqueMonths.map(month => {
                    const filteredItems = filteredData.filter(item => item.Month === month);
                    const totalSum = filteredItems.reduce((sum, item) => sum + item.TotalPriceByCategory, 0);
                    return (
                        <Grid item xs={6} md={6} key={month}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Statistics for Month {month} - <span style={{ fontWeight: 550 }}>{totalSum}</span></Typography>
                                    <PieChart width={600} height={300}>
                                        <Pie
                                            data={filteredItems}
                                            dataKey="TotalPriceByCategory"
                                            nameKey="Category_Name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#82ca9d"
                                            label
                                        >
                                            {filteredItems.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index]} />
                                            ))}
                                        </Pie>
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default Dashboard;
