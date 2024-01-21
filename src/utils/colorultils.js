export const getColorClass = (value) => {
  if (value === "Chưa Xác Thực") {
    return "text-red-500 ";
  } else if (value === "Đã xác thực") {
    return "text-green-500";
  } else {
    return "";
  }
};
