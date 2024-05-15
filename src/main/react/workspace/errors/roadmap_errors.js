import { common_errors } from "./common_errors";

const errors = {
    "pr_membership_required": {
        message: "Вы не участник этого проекта"
    },
    "pr_not_exists": {
        message: "Проект не существует"
    },
    "rms_not_exists": {
        message: "Этап дорожной карты не существует"
    },
    "rms_ownerless": {
        message: "Проект с этим этапом не найден"
    },
    "too_many_stages": {
        message: "В проекте не может быть более N этапов"
    },
    "position_out_of_bounds": {
        message: "Желаемая позиция этапа выходит за максимум"
    },
    "rmt_not_exists": {
        message: "Задача этапа дорожной карты не существует"
    },
    "rmta_not_exists": {
        message: "Вложение задачи не существует"
    },
    "rmt_ownerless": {
        message: "Проект с этой задачей не найден"
    },
    "upload_not_exists": {
        message: "Файл вложения не найден"
    },
    "bad_upload": {
        message: "Неподдерживаемый тип вложения"
    },
    "undefined_content_type": {
        message: "Тип содержимого должен быть определен"
    },
    "undefined_file_name": {
        message: "Имя файла должно быть определено"
    },
    "too_many_tasks": {
        message: "В этапе не может быть более N задач"
    }
}

export const getRoadmapError = (error_code) => {
    if (Object.keys(errors).includes(error_code)) {
        return errors[error_code];
    }
    else if (Object.keys(common_errors).includes(error_code)) {
        return common_errors[error_code];
    }
    return {message: "Неизвестная ошибка"};
}