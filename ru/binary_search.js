/* 

# Задача поиска телефона по фамилии и имени человека в телефонном справочнике.

Входные данные (что мы имеем изначально):
* phonebook — массив пар (person, phone), где
  person — строка вида “Surname Name”,
  phone —  строка вида “555-55-55”.
  Порядок пар задан алфавитным порядком строк person.
  Каждая пара имеет свой номер, по которому можно к ней обратиться.
* lookup_person — строка, содержащая имя и фамилию искомой персоны

Выходные данные (что мы хотим узнать):
* телефон искомого человека
* место в списке, где находится запись об искомом человеке и его телефоне

Метод решения:

1. Мы начинаем поиск, рассматривая список целиком — любой из N элементов
   может оказаться нашим искомым
2. Открываем справочник ровно посередине и сравниваем среднюю запись с искомой.
3. Если средняя фамилия справочника совпадает с искомой — ура, мы всё нашли.
   Закончить работу, вернуть обнаруженную пару.
4. Если средняя фамилия справочника по алфавиту идёт позднее искомой — вторую часть справочника
   мы отбрасываем (упрощаем задачу себе вдвое тем самым), а в первой повторяем поиск начиная с
   пункта (2) нашего алгоритма
5. Если же средняя фамилия справочника по алфавиту идёт раньше искомой, то отбрасываем уже первую
   часть справочника, а поиск с пункта (2) повторяем для второй.

*/

phonebook = [
  ["Абалаев Иван", "111-11-11"],        // элемент списка №0 
  ["Баранов Сергей", "222-11-11"],      // элемент списка №1
  ["Волкова Ольга", "333-11-11"],       // элемент списка №2
  ["Громов Пётр", "444-11-11"],         // элемент списка №3
  ["Добрая Анна", "555-11-11"],         // элемент списка №4
  ["Ежова Елизавета", "666-11-11"]      // элемент списка №5
]

lookup_person = "Добрая Анна"


function get_middle_index (phonebook) {
    return Math.floor(phonebook.length / 2)
}

function get_middle_record (phonebook) {
    middle_index = get_middle_index(phonebook)
    return phonebook[middle_index]
}

function get_first_half (phonebook) {
    middle_index = get_middle_index(phonebook)
    return phonebook.slice(0, middle_index)
}

function get_second_half (phonebook) {
    middle_index = get_middle_index(phonebook)
    return phonebook.slice(middle_index, phonebook.length)
}

function binary_search (phonebook, lookup_person) {
    middle_pair = get_middle_record(phonebook)
    middle_person = middle_pair[0]
    if (middle_person == lookup_person) {
        // ура, мы всё нашли
        middle_phone = middle_pair[1]
        return middle_phone;
        // возвращаем телефон
    }
    if (middle_person < lookup_person) {
        // искомая персона по алфавиту расположена после средней в рассматриваемой части телефонной книги
        // значит искать надо во второй половине рассматриваемой части телефонной книги
        half_of_the_task = get_second_half(phonebook)
        return binary_search(half_of_the_task, lookup_person)
    }
    if (middle_person > lookup_person) {
        // искомая персона по алфавиту расположена до средней в рассматриваемой части телефонной книги
        // значит искать надо в первой половине рассматриваемой части телефонной книги
        half_of_the_task = get_first_half(phonebook)
        return binary_search(half_of_the_task, lookup_person)
    }
}