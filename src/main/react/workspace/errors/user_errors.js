import { common_errors } from "./common_errors";

const errors = {
    "no_current_user": {
        message: "Текущий пользователь не задан"
    },
    "have_joined_workspace": {
        message: "Вы ещё состоите в минимум одной рабочей области"
    }
}

export const getUserError = (error_code) => {
    if (Object.keys(errors).includes(error_code)) {
        return errors[error_code];
    }
    else if (Object.keys(common_errors).includes(error_code)) {
        return common_errors[error_code];
    }
    return {message: "Неизвестная ошибка"};
}