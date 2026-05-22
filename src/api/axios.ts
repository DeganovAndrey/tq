import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

const STATUS_MESSAGES = {
  400: "Неверный запрос",
  403: "Доступ запрещен",
  404: "Данные не найдены",
  500: "Ошибка сервера",
};

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    let message: string;

    if (error.response) {
      const { status, data } = error.response;

      message =
        data?.message ||
        STATUS_MESSAGES[status] ||
        `Ошибка сервера - ${status}`;
    } else if (error.request) {
      message = "Сервер не отвечает";
    } else {
      message = error.message || "Произошла непредвиденная ошибка";
    }

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
