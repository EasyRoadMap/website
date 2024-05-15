import { common_errors } from "./common_errors";

const errors = {
    "pr_not_exists": {
        message: "Проект не существует"
    },
    "rms_not_exists": {
        message: "Этап дорожной карты не существует"
    },
    "ws_not_exists": {
        message: "Рабочая область не существует"
    },
}

export const getPublicError = (error_code) => {
    if (Object.keys(errors).includes(error_code)) {
        return errors[error_code];
    }
    else if (Object.keys(common_errors).includes(error_code)) {
        return common_errors[error_code];
    }
    return {message: "Неизвестная ошибка"};
}