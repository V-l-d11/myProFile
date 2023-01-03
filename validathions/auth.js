import { body } from 'express-validator'

export const loginValidathion = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль  указан не  верно').isLength({ min: 5 }),
]

export const registerValidathion = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль  указан не  верно').isLength({ min: 5 }),
    body('fullName', 'Укажите име').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на  аватарку').optional().isURL(),
]

export const postCreateValidathion = [
    body('title', 'Введите зашоловок статьи').isLength({min:3}).isString(),
    body('text', 'Ввудите текст статьи ').isLength({min:3}).isString(),
    body('tags', 'Неверный формат тэгов (укадите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]
