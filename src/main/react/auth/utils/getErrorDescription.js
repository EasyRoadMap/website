const fields = {
    email: "email",
    password: "password",
    code: "code",
    name: "name",
    popup: "popup"
};

const errorsWithoutField = {
    "user_already_exists": {
        description: "Пользователь с такими данными уже существует",
        field: fields.popup
    },
    "email_not_confirmed": {
        description: "Email на подтвержден",
        field: fields.email
    },
    "email_already_used": {
        description: "Email уже используется",
        field: fields.email
    },
    "email_confirmation_pending": {
        description: "Ожидается подтверждение email",
        field: fields.email
    },
    "email_already_confirmed": {
        description: "Email уже подтвержден",
        field: fields.email
    },
    "request_not_found": {
        description: "Запрос не найден",
        field: fields.popup
    },
    "request_expired": {
        description: "Время запроса истекло",
        field: fields.popup
    },
    "no_more_attempts": {
        description: "Вы потратили все попытки ввести код",
        field: fields.popup
    },
    "wrong_code": {
        description: "Неверный код",
        field: fields.code
    },
    "bad_credentials": {
        description: "Неправильный логин или пароль",
        field: fields.popup
    },
    "provider_not_found": {
        description: "Сервис в данный момент недоуступен, попробуйте позже",
        field: fields.popup
    },
    "unexpected_error": {
        description: "Сервис в данный момент недоуступен, попробуйте позже",
        field: fields.popup
    },
    "user_not_found": {
        description: "Пользователь не найден",
        field: fields.email
    },
    "request_not_confirmed": {
        description: "Запрос не подтверждён",
        field: fields.popup
    },
    "wrong_proof_key": {
        description: "Сервис в данный момент недоуступен, попробуйте позже",
        field: fields.popup
    },
    "email_confirmation_unrenewable": {
        description: "Подтверждение почты пока нельзя запросить повторно",
        field: fields.popup
    }
}

const fieldsDescription = {
    "email": "email",
    "password": "пароль",
    "code": "код подтверждения"
}

export const getErrorDescription = (errorCode, fieldName) => {
    if (errorCode === "incorrect_field_value" && fieldName) {
        return {
            description: "Неверный " + fieldsDescription[fieldName],
            field: fieldName
        }
    } else if (errorCode in errorsWithoutField) {
        return errorsWithoutField[errorCode]
    } else {
        console.log("interesting)");
        return {
            description: "Сервис в данный момент недоуступен, попробуйте позже",
            field: "popup"
        }
    }
}