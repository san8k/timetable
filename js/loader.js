export default async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(err) {
        throw new Error(`Не удалось получить данные. Ошибка: ${err.message}.`);
    }
};

