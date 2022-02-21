import {init} from '@lib/postgreSQL';

export const selectUser = async (login) => {
    const db = await init();
    return db.one('SELECT * FROM public.users WHERE user_login=$1 LIMIT 1', [login]);
};