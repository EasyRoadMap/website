export const validatePassword = (password) => {
    if (password.length < 8) return "Пароль должен состоять не менее чем из 8 символов";
    if (password.length > 128) return "Пароль должен состоять не более чем из 128 символов";
    return "passed";
}
export const validateName = (name, from) => {
    let min, max;
    if (from === "workspace" || from === "project") {
        min = 2; max = 64;
    }
    if (from === "task") {
        min = 2; max = 80;
    }
    if (from === "stage") {
        min = 2; max = 32;
    }
    if (from === "user") {
        min = 1; max = 64;
    }
    if (!min || !max) return "Неизвестная ошибка";
    if (name.length < min) return `Имя должно состоять не менее чем из ${min} символ${min === 1 ? "а" : "ов"}`;
    if (name.length > max) return `Имя должно состоять не более чем из ${max} символов`;
    return "passed";
}

export const validateDescription = (description) => {
    if (description.length < 2 && description.length !== 0) return "Описание должно состоять не менее чем из 2 символов";
    if (description.length > 320) return "Описание должно состоять не более чем из 320 символов";
    return "passed";
}

export const validateDeadlineDate = (strDeadlineAt) => {
    const currentDate = new Date(); 
    currentDate.setHours(0,0,0,0);
    const deadlineAt = new Date(strDeadlineAt);
    console.debug(deadlineAt, currentDate);
    if (currentDate >= deadlineAt) return "Дата дедлайна должна быть позже сегодняшнего дня"
    return "passed"
}

export const validateRole = (role) => {
    // if (role.length < 1) return "Название должности должно состоять не менее чем из 1 символа";
    if (role.length > 32) return "Название должности должно состоять не более чем из 32 символов";
    return "passed"
}