const userRouter = require("./UserRouter");
const sendEmail = require("./SendEmail");
const CartItemRouter = require("./CartItemRouter");
const CategoryRouter = require("./CategoryRouter");
const OderRouter = require("./OderRouter");
const PaymentRouter = require("./PaymentRouter");
const ProductRouter = require("./ProductRouter");
const optionRouter = require("./optionRouter");
const comentRouter = require("./comentRouter");
const AdminStatistical = require("./AdminStatistical");
const downloadExcelExcel = require("./Excel");
const TestRoute = require("./testRoute");
const ChatbotRouter = require("./ChatbotRouter");

const routes = (app) => {
  app.use("/api/Excel", downloadExcelExcel);
  app.use("/api/AdminStatisticalRouter", AdminStatistical);
  app.use("/api/userRouter", userRouter);
  app.use("/api/comentRouter", comentRouter);
  app.use("/api/optionRouter", optionRouter);
  app.use("/api/sendEmail", sendEmail);
  app.use("/api/CartItemRouter", CartItemRouter);
  app.use("/api/CategoryRouter", CategoryRouter);
  app.use("/api/OderRouter", OderRouter);
  app.use("/api/PaymentRouter", PaymentRouter);
  app.use("/api/ProductRouter", ProductRouter);
  app.use("/api/TestRoute", TestRoute);
  app.use("/api", ChatbotRouter);
};

module.exports = routes;
