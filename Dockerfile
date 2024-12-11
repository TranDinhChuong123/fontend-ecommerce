# Sử dụng image Node.js làm base image
FROM node:20-alpine

# Set thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc của dự án
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build dự án Next.js
RUN npm run build

# Expose port 3000 (port mặc định của Next.js)
EXPOSE 3000

# Lệnh chạy ứng dụng khi container được khởi động
CMD ["npm", "start"]
