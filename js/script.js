class Student {
    constructor(surname, name, lastname, faculty, birthDate, startStudyYear) {
        this.surname = surname;
        this.name = name;
        this.lastname = lastname;
        this.faculty = faculty;
        this.birthDate = birthDate;
        this.startStudyYear = startStudyYear;
    }

    get fioGet() {
        return this.surname + ' ' + this.name + ' ' + this.lastname;
    }

    get facultyGet() {
        return this.faculty;
    }

    get birthDateGet() {
        let yyyy = this.birthDate.getFullYear(),
            mm = this.birthDate.getMonth() + 1,
            dd = this.birthDate.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm =  '0' + mm;
        return dd + '.' + mm + '.' + yyyy;
    }

    get ageGet() {
        let now = new Date(2022, 4, 19);
        return now.getFullYear() - this.birthDate.getFullYear();
    }

    get differenceNowAndBirthDateGet() {
        let now = new Date(2022, 4, 19);
        return now - this.birthDate;
    }

    get startStudyYearGet() {
        let now = new Date(2022, 4, 19);
        return `${now.getFullYear()}` - `${this.startStudyYear}`;
    }

    get studyYearsGet() {
        return `${this.startStudyYear}-${this.startStudyYear + 4}`;
    }

    get startYearGet() {
        return this.startStudyYear;
    }

    get finishYearGet() {
        return this.startStudyYear + 4;
    }
}

const students = [
    new Student('Иванов', 'Александр', 'Трофимович', 'Юриспруденция',
        new Date(2001, 1, 11), 2018),
    new Student('Петрова', 'Лиана', 'Алексеевна', 'Математика',
        new Date(2002, 2, 22), 2019),
    new Student('Коновалов', 'Алексей', 'Сергеевич', 'Экономика',
        new Date(2003, 3, 3), 2020)
];

function createStudentsList(student) {
    const $studentTR = document.createElement('tr'),
        $fioTD = document.createElement('td'),
        $facultyTD = document.createElement('td'),
        $birthDataAndAge = document.createElement('td'),
        $studyYearsAndNumberCourse = document.createElement('td');

    $fioTD.textContent = student.fioGet;
    $facultyTD.textContent = student.facultyGet;
    $birthDataAndAge.textContent = `${student.birthDateGet} (${student.ageGet})`;

    if (student.startStudyYearGet > 4) {
        $studyYearsAndNumberCourse.textContent = `${student.studyYearsGet} (закончил)`;
    } else {
        $studyYearsAndNumberCourse.textContent = `${student.studyYearsGet} (${student.startStudyYearGet} курс)`;
    }

    $studentTR.append($fioTD);
    $studentTR.append($facultyTD);
    $studentTR.append($birthDataAndAge);
    $studentTR.append($studyYearsAndNumberCourse);
    return $studentTR;
}

function sortStudents(arr, prop, dir) {
    let result = arr.sort((studentA, studentB) => {
        if (dir === true) {
            if (studentA[prop] < studentB[prop]) return -1;
        } else {
            if (studentA[prop] > studentB[prop]) return -1;
        }
    });
    return result;
}

let dirGlobal1 = true,
    dirGlobal2 = true,
    dirGlobal3 = true,
    dirGlobal4 = true;

document.querySelector('.btn1').addEventListener('click', () => {
    deleteRendering();
    sortStudents(students, 'fioGet'.trim(), dirGlobal1);
    dirGlobal1 = !dirGlobal1;
    rendering();
});

document.querySelector('.btn2').addEventListener('click', () => {
    deleteRendering();
    sortStudents(students, 'facultyGet'.trim(), dirGlobal2);
    dirGlobal2 = !dirGlobal2;
    rendering();
});

document.querySelector('.btn3').addEventListener('click', () => {
    deleteRendering();
    sortStudents(students, 'differenceNowAndBirthDateGet', dirGlobal3);
    dirGlobal3 = !dirGlobal3;
    rendering();
});

document.querySelector('.btn4').addEventListener('click', () => {
    deleteRendering();
    sortStudents(students, 'startStudyYearGet', dirGlobal4);
    dirGlobal4 = !dirGlobal4;
    rendering();
});

function rendering() {
    let studentsCopy = [...students];

    for (const student of studentsCopy) {
        document.querySelector('tbody').append(createStudentsList(student));
    }
}

rendering();

const $tBody = document.getElementById('students-list');

function deleteRendering() {
    const $elements = document.getElementsByTagName('td');

    for (const element of $elements) {
        $tBody.querySelector('tr').remove(element);
    }
}

const validation = new window.JustValidate('#form');

validation
    .addField('#input-name', [
        {
            rule: 'required',
            errorMessage: 'Введите имя, это поле обязательное!',
        }
    ])
    .addField('#input-surname', [
        {
            rule: 'required',
            errorMessage: 'Введите фамилию, это поле обязательное!',
        }
    ])
    .addField('#input-lastname', [
        {
            rule: 'required',
            errorMessage: 'Введите отчество, это поле обязательное!',
        }
    ])
    .addField('#input-birth-date', [
        {
            rule: 'required',
            errorMessage: 'Введите дату рождения, это поле обязательное!',
        },
        {
            rule: 'function',
            validator: () => {
                const str = document.getElementById('input-birth-date').value;
                const clearStr = str.split('.').join('');
                const yearFromStr = clearStr.substr(0, 4);
                return yearFromStr >= 1922;
            },
            errorMessage: 'Дата рождения находится в диапазоне от 01.01.1922' +
                ' до текущей даты',
        }
    ])
    .addField('#input-start-year', [
        {
            rule: 'required',
            errorMessage: 'Введите год начала обучения, это поле обязательное!',
        },
        {
            rule: 'function',
            validator: () => {
                const startYearInputValue = document.getElementById('input-start-year').value;
                return Number(startYearInputValue) >= 2000;
            },
            errorMessage: 'Год начала обучения находится в диапазоне от' +
                ' 2000-го до текущего года',
        }
    ])
    .addField('#input-faculty', [
        {
            rule: 'required',
            errorMessage: 'Введите название факультета, это поле обязательное!',
        }
    ])

    .onSuccess(() => {
        students.push(new Student(
            document.getElementById('input-surname').value,
            document.getElementById('input-name').value,
            document.getElementById('input-lastname').value,
            document.getElementById('input-faculty').value,
            new Date(document.getElementById('input-birth-date').value),
            Number(document.getElementById('input-start-year').value)
        ));

        deleteRendering();
        rendering();

        document.getElementById('input-name').value = '';
        document.getElementById('input-surname').value = '';
        document.getElementById('input-lastname').value = '';
        document.getElementById('input-birth-date').value = '';
        document.getElementById('input-start-year').value = '';
        document.getElementById('input-faculty').value = '';
    });

const $inputFilterFIO = document.getElementById('filter-fio'),
    $inputFilterFaculty = document.getElementById('filter-faculty'),
    $inputFilterStartYear = document.getElementById('filter-start-year'),
    $inputFilterFinishYear = document.getElementById('filter-finish-year');

function filtration(arr, prop, value) {
    let result = [];
    for (const item of arr) {
        if (String(item[prop]).includes(value) === true) result.push(item);
    }
    return result;
}

function renderingFilter(arr) {
    let arrCopy = [...arr];

    for (const item of arrCopy) {
        document.querySelector('tbody').append(createStudentsList(item));
    }
}

$inputFilterFIO.addEventListener('keyup', () => {
    let resultFiltration = filtration(students, 'fioGet', $inputFilterFIO.value);
    deleteRendering();
    renderingFilter(resultFiltration);
});

$inputFilterFaculty.addEventListener('keyup', () => {
    let resultFiltration = filtration(students, 'facultyGet', $inputFilterFaculty.value);
    deleteRendering();
    renderingFilter(resultFiltration);
});

$inputFilterStartYear.addEventListener('keyup', () => {
    let resultFiltration = filtration(students, 'startYearGet', $inputFilterStartYear.value);
    deleteRendering();
    renderingFilter(resultFiltration);
});

$inputFilterFinishYear.addEventListener('keyup', () => {
    let resultFiltration = filtration(students, 'finishYearGet', $inputFilterFinishYear.value);
    deleteRendering();
    renderingFilter(resultFiltration);
});
