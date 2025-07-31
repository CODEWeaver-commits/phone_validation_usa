function validateForm() {
    // Отримуємо значення телефону
    let form = event.target; // Форма, яку користувач відправляє
    let phoneInput = form.querySelector('.phone'); // Беремо телефон саме з цієї форми

    let phoneValue = phoneInput.value;
    let digitsOnly = phoneValue.replace(/\D/g, ''); // Видаляємо всі нецифрові символи

    // Перевірка на кількість цифр
    if (digitsOnly.length !== 11 || !digitsOnly.startsWith("1")) {
        alert('Please enter the number in the format +1 (XXX) XXX-XXXX');
        return false; // Зупиняємо відправку форми
    }

    // Перевірка коду (area code в США)
    let operatorCode = phoneValue.match(/\+1 \((\d{3})\)/); // Витягуємо код області

    if (operatorCode && operatorCode[1]) {
        let area = parseInt(operatorCode[1], 10);
        if (area < 200 || area > 999) { 
            alert('Invalid region code! The code must be between 200 and 999.');
            return false; // Зупиняємо відправку форми
        }
    } else {
        alert('Enter the number in the correct format!');
        return false; // Зупиняємо відправку форми
    }

    // Отримуємо ідентифікатори інпутів
    let num = form.querySelector('input[name^="tel"]').name.replace('tel', '') || 1;
    let name = form.querySelector('input[name^="name"]').name.replace('name', '') || '';

    // Якщо перевірки пройшли успішно, викликаємо sendorder
    sendorder(num); // Відправка форми через sendorder
    return false; // Повертаємо false, щоб форма не відправлялася стандартним способом
}
