import React, { useEffect, useState } from "react";
import { Grid, CardContent, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { Table, Typography, Card, Button } from "antd";
import axios from "axios";
import * as XLSX from 'xlsx';

const Dashboard = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/AdminStatisticalRouter/productRankTable');
            setData(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const categories = [...new Set(data.map((item) => item.CategoryName))];
    const years = [...new Set(data.map((item) => item.Year))];
    const months = [...new Set(data.map((item) => item.Month))];

    const yearsSort = years.sort((a, b) => a - b);
    const monthsSort = months.sort((a, b) => a - b);

    const categoryFilters = categories.map((category) => ({
        text: category,
        value: category,
    }));

    const yearsFilters = yearsSort.map((item) => ({
        text: item,
        value: item,
    }));

    const monthsFilters = monthsSort.map((item) => ({
        text: item,
        value: item,
    }));

    const columns = [
        {
            title: "Product Name",
            dataIndex: "ProductName",
            key: "ProductName",
        },
        {
            title: "Category Name",
            dataIndex: "CategoryName",
            key: "CategoryName",
            filters: categoryFilters,
            onFilter: (value, record) => record.CategoryName === value,
        },
        {
            title: "Year",
            dataIndex: "Year",
            key: "Year",
            filters: yearsFilters,
            onFilter: (value, record) => record.Year === value,
        },
        {
            title: "Month",
            dataIndex: "Month",
            key: "Month",
            filters: monthsFilters,
            onFilter: (value, record) => record.Month === value,
        },
        {
            title: "Total Price (VND)",
            dataIndex: "TotalPriceByProduct",
            key: "TotalPriceByProduct",
            render: (price) => price.toLocaleString("vi-VN"),
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const filteredData = data.filter((item) => {
        return (
            (selectedCategory ? item.CategoryName === selectedCategory : true) &&
            (selectedYear ? item.Year === selectedYear : true) &&
            (selectedMonth ? item.Month === selectedMonth : true)
        );
    });

    const groupedData = filteredData.reduce((acc, item) => {
        const key = `${item.Year}-${item.Month}-${item.CategoryName}`;
        if (!acc[key]) {
            acc[key] = {
                Year: item.Year,
                Month: item.Month,
                CategoryName: item.CategoryName,
                products: [],
            };
        }
        acc[key].products.push({
            ProductName: item.ProductName,
            TotalPriceByProduct: item.TotalPriceByProduct,
        });
        return acc;
    }, {});

    const processedData = Object.values(groupedData);
    const [filteredDataExport, setfilteredDataExport] = useState(data);

    const handleTableChange = (pagination, filters) => {
        const { CategoryName, Year, Month } = filters;
        console.log("first", data);
        const filtered = data.filter(item => {
            let isFiltered = true;

            if (CategoryName && CategoryName.length > 0) {
                isFiltered = isFiltered && CategoryName.includes(item.CategoryName);
            }

            if (Year && Year.length > 0) {
                isFiltered = isFiltered && Year.includes(item.Year);
            }

            if (Month && Month.length > 0) {
                isFiltered = isFiltered && Month.includes(item.Month);
            }

            return isFiltered;
        });
        setfilteredDataExport(filtered);
    };

    const handleDownload = async () => {
        console.log("first", filteredDataExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(filteredDataExport.length === 0 ? data : filteredDataExport), 'Sheet1');
        XLSX.writeFile(workbook, "data.xlsx");
    };

    const handlePieChart = async () => {
        console.log("first", processedData);
        const exportData = [];

        for (const item of processedData) {
            if (Array.isArray(item.products)) {
                for (const product of item.products) {
                    exportData.push({
                        CategoryName: item.CategoryName,
                        Month: item.Month,
                        Year: item.Year,
                        ProductName: product.ProductName,
                        Price: product.TotalPriceByProduct
                    });
                }
            }
        }

        const ws = XLSX.utils.json_to_sheet(exportData);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Export Data');

        XLSX.writeFile(wb, 'exported_data.xlsx');
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Button onClick={handleDownload} style={{ marginBottom: 16 }}>Export Excel File</Button>
            <Card style={{ margin: "20px 0" }}>
                <Typography.Title level={4}>Revenue Trend</Typography.Title>
                <Table
                    onChange={handleTableChange}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            </Card>
            <Box sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button onClick={handlePieChart} style={{ marginBottom: 16 }}>Export Excel File</Button>
                    </Grid>
                    {/* Filter */}
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Category Name</InputLabel>
                            <Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                label="Category Name"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Year</InputLabel>
                            <Select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                label="Year"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                {years.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Month</InputLabel>
                            <Select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                label="Month"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                {months.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Chart */}
                <Grid container spacing={3} style={{ marginTop: "20px" }}>
                    {processedData.map(({ Year, Month, CategoryName, products }) => (
                        <Grid item xs={12} md={6} key={`${Year}-${Month}-${CategoryName}`}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{CategoryName}</Typography>
                                    <Typography variant="body2">
                                        {`Year: ${Year}, Month: ${Month}`}
                                    </Typography>
                                    <PieChart width={300} height={300}>
                                        <Pie
                                            data={products}
                                            dataKey="TotalPriceByProduct"
                                            nameKey="ProductName"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#82ca9d"
                                            label
                                        >
                                            {products.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]}
                                                />
                                            ))}
                                        </Pie>
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default Dashboard;
