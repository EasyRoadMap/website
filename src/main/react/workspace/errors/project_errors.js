import { common_errors } from "./common_errors";

const errors = {
    "pr_membership_required": {
        message: "Вы не участник этого проекта"
    },
    "pr_not_exists": {
        message: "Проект не существует"
    },
    "already_joined": {
        message: "Вы уже состоите в проекте"
    },
    "too_many_projects": {
        message: "Нельзя создать больше N проектов"
    },
    "ws_not_exists": {
        message: "Рабочая область не существует"
    },
    "ws_ownership_required": {
        message: "Требуются права администратора"
    },
    "bad_links": {
        message: "Ссылки переданы неверно"
    },
    "user_already_joined": {
        message: "Пользователь уже добавлен в проект"
    },
    "user_cannot_be_added": {
        message: "Пользователь не может быть добавлен"
    },
    "pr_ownership_required": {
        message: "Требуются права администратора"
    },
    "user_cannot_be_removed": {
        message: "Пользователь не может быть исключен"
    },
    "user_not_a_member": {
        message: "Пользователь не является участником проекта"
    }
}

export const getProjectError = (error_code) => {
    if (Object.keys(errors).includes(error_code)) {
        return errors[error_code];
    }
    else if (Object.keys(common_errors).includes(error_code)) {
        return common_errors[error_code];
    }
    return {message: "Неизвестная ошибка"};
}