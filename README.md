# Тестовое задание - расписание авиарейсов

Для тестирования на разных аэропортах нужно в файле main.js изменить значение AIRPORT_IATA_CODE на любое значение аэропорта в формате IATA.
Например, если в текущем аэропорту нет задержанных рейсов, можно изменить на любой крупный, где они скорее всего есть (например, Домодедово - DME).

## Warning!

Api иногда не отдает данные для вылетающих или прилетающих рейсов, тогда также можно поменять аэропорт на любой другой.

## Описание работы приложения

При нажатии на кнопку "Вылет" или "Прилет" загружаются данные вылетающих или прилетающих рейсов для заданного аэропорта соответственно.

В режиме "Вылет" в первой колонке отображается время вылета, во второй - пункт назначения, третьей - номер рейса в формате IATA, четвертой - статус рейса.

В режиме "Прилет" в первой колонке отображается время прилета, во второй - пункт отправления, третьей - номер рейса IATA, четвертой - статус рейса.

При активации чекбокса "Показать задержанные", приложение отоборажает рейсы с задержкой вылета для режима "Вылет" и задержкой прибытия для режима "Прилет" соответственно.

Поле "Поиск рейса" принимает значения номеров рейсов в формате IATA. Поиск находит рейсы по валидной последовательности символов независимо от ее расположения в номере искомого рейса.

## Api

Api получен с сайта https://aviation-edge.com.