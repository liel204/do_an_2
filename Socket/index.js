const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const db = require("../Server/src/models/index");

//Init Connect Database================================
const connectDB = require("../Server/src/config/connectDB");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Tạo HTTP server
const server = http.createServer(app);

// Thiết lập Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Lắng nghe sự kiện kết nối
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Khi người dùng tham gia phòng chat
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
    console.log("first", room);
    // Gửi tin nhắn lịch sử (nếu cần)

    db.Message.findAll({ where: { conversationId: room } }).then((text) => {
      socket.emit("load_messages", text);
    });
  });

  // Nhận tin nhắn từ client và gửi đến phòng
  // Khởi tạo mảng để lưu danh sách conversationId

  socket.on("send_message", async (data) => {
    try {
      const { conversationId, text, senderID } = data;
      console.log(`Message to room ${conversationId}:`, text);
      // Lấy danh sách unique conversationId
      const conversationIds = await db.Message.findAll({
        attributes: [
          [
            db.Sequelize.fn("DISTINCT", db.Sequelize.col("conversationId")),
            "conversationId",
          ],
        ],
      });
      const conversationsArray = conversationIds.map(
        (conv) => conv.conversationId
      );

      // Kiểm tra xem conversationId đã tồn tại trong mảng chưa
      if (!conversationsArray.includes(conversationId)) {
        // Nếu chưa tồn tại, thêm vào mảng
        conversationsArray.push(conversationId);
        console.log("Thêm conversation mới:", conversationId);
      }

      // Lưu tin nhắn mới vào database
      await db.Message.create({
        conversationId,
        senderID,
        text,
      });

      // Gửi danh sách conversations cho tất cả client
      io.emit("update_conversations", conversationsArray);

      // Gửi tin nhắn tới phòng chat
      io.to(conversationId).emit("receive_message", {
        senderID,
        text,
        time: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  });

  // Sự kiện get_conversations: Lấy danh sách các conversationId
  socket.on("get_conversations", async (callback) => {
    try {
      // Lấy danh sách conversationId từ database
      const conversationsArray = await db.Message.findAll({
        attributes: [
          [
            db.Sequelize.fn("DISTINCT", db.Sequelize.col("conversationId")),
            "conversationId",
          ],
        ],
      });

      // Chuyển đổi thành mảng giá trị
      const conversationIds = conversationsArray.map(
        (conv) => conv.conversationId
      );

      console.log("Danh sách conversationIds:", conversationIds);

      // Trả về danh sách qua callback
      callback({ status: "success", data: conversationIds });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách conversations:", error);
      callback({
        status: "error",
        message: "Không thể lấy danh sách conversations",
      });
    }
  });

  // Khi người dùng ngắt kết nối
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Khởi chạy server
const PORT = 4000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
