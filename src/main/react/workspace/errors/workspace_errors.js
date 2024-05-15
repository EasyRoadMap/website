import { common_errors } from "./common_errors";

const errors = {
    "ws_membership_required": {
        message: "Вы не состоите в этой рабочей области"
    },
    "ws_not_exists": {
        message: "Рабочая область не существует"
    },
    "ws_ownership_required": {
        message: "Требуются права администратора"
    },
    "already_joined": {
        message: "Вы уже состоите в этой рабочей области"
    },
    "too_many_joined_workspaces": {
        message: "Вы не можете состоять более чем в N рабочих областях"
    },
    "invitation_expired": {
        message: "Время действия приглашения истекло"
    },
    "invitation_not_found": {
        message: "Приглашение не найдено"
    },
    "invitation_not_yours": {
        message: "Приглашение не принадлежит Вам"
    },
    "invitation_ownerless": {
        message: "Приглашение получено из несуществующей рабочей области"
    },
    "inviter_not_found": {
        message: "Отправитель приглашения не найден"
    },
    "inviter_not_longer_admin": {
        message: "Отправитель приглашения больше не является администратором"
    },
    "user_already_invited": {
        message: "Пользователь уже приглашен"
    },
    "user_not_found": {
        message: "Пользователь не найден"
    },
    "ws_full": {
        message: "В рабочей области могут состоять не более N участников"
    },
    "too_many_joined_workspaces": {
        message: "Вы не можете состоять более чем в N рабочих областях"
    },
    "ws_denied_for_admin": {
        message: "Администратор не может выйти из своей рабочей области"
    },
    "user_cannot_be_kicked": {
        message: "Пользователь не может быть исключен"
    },
    "user_not_a_member": {
        message: "Пользователь не состоит в этой рабочей области"
    }
}

export const getWorkspaceError = (error_code) => {
    console.debug("getWorkspaceError");
    console.debug("getWorkspaceError", Object.keys(errors), error_code);

    if (Object.keys(errors).includes(error_code)) {
        return errors[error_code];
    }
    else if (Object.keys(common_errors).includes(error_code)) {
        return common_errors[error_code];
    }
    return {message: "Неизвестная ошибка"};
}