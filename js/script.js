
    const $ = document;  
    function _class(className){  
        return $.getElementsByClassName(className);  
    };  
    function _id(idName){  
        return $.getElementById(idName);  
    };  
    function _query(querySelector){  
        return $.querySelector(querySelector);  
    };  
    
    // متغییر ها  
    const menu = _id('menu');   
    const hamburger = _id('hamburger');  
    const submitButton = _id('todo__submit-button');  
    let todoTasks = _id('todo__tasks');  
    let todoInput = _id('todo__input');  
    let errorMessage = _id('error-message');  
    
   
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];  
    
    
    function renderTasks() {  
        todoTasks.innerHTML = '';  
    
        if (tasks.length === 0) { 
            let noTasksMessage = $.createElement('div');  
            noTasksMessage.classList.add('no-tasks');  
            noTasksMessage.id = 'noTasksMessage';  
            noTasksMessage.innerHTML = 'There are no tasks yet';  
            todoTasks.appendChild(noTasksMessage); 
        } else {  
            tasks.forEach(task => {  
                let todoTask = $.createElement('div');  
                let checkBox = $.createElement('input');  
                let todoText = $.createElement('span');  
                let todoDelete = $.createElement('img');  
    
                todoTask.classList.add('todo__task');  
                checkBox.type = 'checkbox';  
                checkBox.classList.add('todo__checkbox');  
                checkBox.checked = task.completed;  
                todoText.innerHTML = task.text;  
                todoText.classList.add('todo__task-text');  
                todoDelete.classList.add('todo__delete-icon');  
                todoDelete.src = '/imgs/trash.svg';  
     
                if (task.completed) {  
                    todoText.style.textDecoration = 'line-through';  
                }  
    
                todoTask.appendChild(checkBox);  
                todoTask.appendChild(todoText);  
                todoTask.appendChild(todoDelete);  
                todoTasks.appendChild(todoTask);  
            });  
        }  
    } 
    

renderTasks();  

// همبرگر منو  
function toggleMenu() {  
    if (menu.style.display === 'block') {  
        menu.style.display = 'none';  
        hamburger.innerHTML = '☰';  
        hamburger.style.transform = 'rotate(180deg)';  
        hamburger.style.fontSize = '24px';  
    } else {  
        menu.style.display = 'block';  
        hamburger.innerHTML = '+';  
        hamburger.style.fontSize = '45px';  
        hamburger.style.transform = 'rotate(45deg)';  
    }  
}  

hamburger.addEventListener('click', toggleMenu);  
hamburger.addEventListener('touchstart', function(event) {  
    event.preventDefault();  
    toggleMenu();  
});  
    
// پاک کردن منو در صورت کلیک روی دیگر نقاط  
function closeMenuAndClearInput() {  
    menu.style.display = 'none';  
    hamburger.innerHTML = '☰';  
    hamburger.style.transform = 'rotate(180deg)';  
    hamburger.style.fontSize = '24px';  
    // پاک کردن مقادیر داخل اینپوت در صورت کلیک در دیگر جاها  
    todoInput.value = '';  
}  

// رویداد برای کلیک  
document.addEventListener('click', function(event) {    
    if (!hamburger.contains(event.target) && !menu.contains(event.target)) {  
        closeMenuAndClearInput();  
    }  
});  

// رویداد برای لمس  
document.addEventListener('touchstart', function(event) {  
    if (!hamburger.contains(event.target) && !menu.contains(event.target)) {  
        closeMenuAndClearInput();  
    }  
});
    
// تودو تسک جدید  
function handleSubmit() {  
    if (todoInput.value.trim() === "") {  
        errorMessage.style.display = 'block';  
        setTimeout(() => {  
            errorMessage.style.display = 'none';  
        }, 2000);  
    } else {  
        // ایجاد ابجکت تسک جدید  
        const newTask = {  
            text: todoInput.value.trim(),  
            completed: false  
        };  
        tasks.push(newTask);  
        localStorage.setItem('tasks', JSON.stringify(tasks));  
        renderTasks();  
        todoInput.value = '';  
    }  
}  

// رویداد برای کلیک  
submitButton.addEventListener('click', handleSubmit);  

// رویداد برای لمس  
submitButton.addEventListener('touchstart', function(event) {  
    event.preventDefault(); // جلوگیری از عمل پیش‌فرض لمسی  
    handleSubmit();  
});
    
// پاک کردن تسک  
function deleteTask(event) {  
    if (event.target.classList.contains('todo__delete-icon')) {  
        const todoTask = event.target.parentNode;  
        const taskIndex = Array.from(todoTasks.children).indexOf(todoTask);  
        tasks.splice(taskIndex, 1);  
        localStorage.setItem('tasks', JSON.stringify(tasks));  
        renderTasks();  
    }  
}  

// رویداد برای کلیک  
todoTasks.addEventListener('click', deleteTask);  

// رویداد برای لمس  
todoTasks.addEventListener('touchstart', function(event) {  
    // استفاده از setTimeout برای جلوگیری از تداخل با رویداد ‘click’  
    setTimeout(() => {  
        deleteTask(event);  
    }, 0);  
});
    
// دابل کلیک
todoTasks.addEventListener('dblclick', function(event) {  
    if (event.target.classList.contains('todo__task-text')) {  
        const todoTask = event.target.closest('.todo__task');  
        const checkBox = todoTask.querySelector('.todo__checkbox');   
        const taskIndex = Array.from(todoTasks.children).indexOf(todoTask);  
        
        if (event.target.style.textDecoration === 'none' || event.target.style.textDecoration === '') {  
            event.target.style.textDecoration = 'line-through';   
            checkBox.checked = true;   
            tasks[taskIndex].completed = true; 
        } else {  
            event.target.style.textDecoration = 'none';   
            checkBox.checked = false;   
            tasks[taskIndex].completed = false;  
        }  
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }  
});  
// دابل لمس

todoTasks.addEventListener('touchend', function(event) {  
    if (event.target.classList.contains('todo__task-text')) {  
        const todoTask = event.target.closest('.todo__task');  
        const checkBox = todoTask.querySelector('.todo__checkbox');   
        const taskIndex = Array.from(todoTasks.children).indexOf(todoTask);  
        
        if (event.target.style.textDecoration === 'none' || event.target.style.textDecoration === '') {  
            event.target.style.textDecoration = 'line-through';   
            checkBox.checked = true;   
            tasks[taskIndex].completed = true; 
        } else {  
            event.target.style.textDecoration = 'none';   
            checkBox.checked = false;   
            tasks[taskIndex].completed = false;  
        }  
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }  
});  
    
// خط کشیدن روی تسک در صورت انجام شدن  
function toggleTaskCompletion(event) {  
    if (event.target.classList.contains('todo__checkbox')) {  
        const todoTask = event.target.closest('.todo__task');  
        const todoText = todoTask.querySelector('.todo__task-text');  
        const taskIndex = Array.from(todoTasks.children).indexOf(todoTask);  

        if (event.target.checked) {  
            todoText.style.textDecoration = 'line-through';  
            tasks[taskIndex].completed = true;  
        } else {  
            todoText.style.textDecoration = 'none';  
            tasks[taskIndex].completed = false;  
        }  
        localStorage.setItem('tasks', JSON.stringify(tasks));  
    }  
}  

// رویداد برای کلیک  
todoTasks.addEventListener('click', toggleTaskCompletion);  

// رویداد برای لمس  
todoTasks.addEventListener('touchstart', function(event) {  
    if (event.target.classList.contains('todo__checkbox')) {  
        // مانع از تداخل با رویداد کلیک  
        event.preventDefault();   
        toggleTaskCompletion(event);  
    }  
});
    
// تغییر تم وبسایت
// متغییر ها
let firstTheme = _id('theme-1');
let secondTheme = _id('theme-2');
let thirdTheme = _id('theme-3');
    
 // تابع برای بارگذاری تم از localStorage  
function loadTheme() {  
    const savedTheme = localStorage.getItem('selectedTheme');  
    
    if (savedTheme) {  
        applyTheme(savedTheme);  
    }  
}  

// تابع برای اعمال تم  
function applyTheme(theme) {  
    if (theme === 'theme-1') {  
        document.body.style.background = 'linear-gradient(100deg, #D2E0FB, #D2E0FB)';  
        const errorMessage = document.querySelector('.error-message');  
        errorMessage.style.color = '#5356FF';  
        errorMessage.style.background = 'linear-gradient(45deg, #fbfbfb, #D2E0FB)';  

        const todoTitle = document.querySelector('.todo__title');  
        todoTitle.style.color = '#378CE7';  

        const todoInput = document.querySelector('.todo__input');  
        todoInput.style.outlineColor = '#8EACCD';  

        const todoSubmitButton = document.querySelector('.todo__submit-button');  
        todoSubmitButton.style.backgroundColor = '#8EACCD';  
        todoSubmitButton.style.background = '#8EACCD';  

        const todoTasks = document.querySelector('.todo__tasks');  
        todoTasks.style.scrollbarColor = '#378CE7 transparent';  

        const style = document.createElement('style');  
        style.innerHTML = `  
            .todo__tasks::-webkit-scrollbar {  
                width: 2px;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb {  
                background-color: #378CE7;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb:hover {  
                background-color: #D2E0FB;  
            }  
        `;  
        document.head.appendChild(style);  

        const menuItems = document.querySelectorAll('.menu li');  
        menuItems.forEach(item => {  
            item.addEventListener('mouseenter', function() {  
                item.style.backgroundColor = '#D2E0FB';  
            });  
            item.addEventListener('mouseleave', function() {  
                item.style.backgroundColor = '';  
            });  
        });  
    } else if (theme === 'theme-2') {  
        document.body.style.background = 'linear-gradient(130deg, #5F6F65, #C9DABF)';  
        const errorMessage = document.querySelector('.error-message');  
        errorMessage.style.color = '#5F6F65';  
        errorMessage.style.background = 'linear-gradient(45deg, #fbfbfb, #C9DABF)';  

        const todoTitle = document.querySelector('.todo__title');  
        todoTitle.style.color = '#C9DABF';  

        const todoInput = document.querySelector('.todo__input');  
        todoInput.style.outlineColor = '#5F6F65';  

        const todoSubmitButton = document.querySelector('.todo__submit-button');  
        todoSubmitButton.style.backgroundColor = '#808D7C';  
        todoSubmitButton.style.background = '#808D7C';  

        const todoTasks = document.querySelector('.todo__tasks');  
        todoTasks.style.scrollbarColor = '#808D7C transparent';  

        const style = document.createElement('style');  
        style.innerHTML = `  
            .todo__tasks::-webkit-scrollbar {  
                width: 2px;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb {  
                background-color: #808D7C;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb:hover {  
                background-color: #C9DABF;  
            }  
        `;  
        document.head.appendChild(style);  

        const menuItems = document.querySelectorAll('.menu li');  
        menuItems.forEach(item => {  
            item.addEventListener('mouseenter', function() {  
                item.style.backgroundColor = '#C9DABF';  
            });  
            item.addEventListener('mouseleave', function() {  
                item.style.backgroundColor = '';  
            });  
        });  
    } else if(theme === 'theme-3') {
        document.body.style.background = 'linear-gradient(100deg, #8093f1, #b388eb)';   
        const errorMessage = document.querySelector('.error-message');  
        errorMessage.style.color = 'rgb(43 20 73)';   
        errorMessage.style.background = 'linear-gradient(45deg, #fbfbfb, #b388eb)';   
        
        const todoTitle = document.querySelector('.todo__title');  
        todoTitle.style.color = '#fbfbfb';     
        
        const todoInput = document.querySelector('.todo__input');  
        todoInput.style.outlineColor = '#b388eb';  
        
        const todoSubmitButton = document.querySelector('.todo__submit-button');  
        todoSubmitButton.style.backgroundColor = '#8093f1';  
        todoSubmitButton.style.background = '#8093f1';
    
    
        const todoTasks = document.querySelector('.todo__tasks');  
        todoTasks.style.scrollbarColor = '#b388eb transparent';  
    
        const style = document.createElement('style');  
        style.innerHTML = `  
            .todo__tasks::-webkit-scrollbar {  
                width: 8px;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb {  
                background-color: #b388eb;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb:hover {  
                background-color: #fdc5f5;  
            }  
        `;  
        document.head.appendChild(style);  
        
        const menuItems = document.querySelectorAll('.menu li');  
        menuItems.forEach(item => {  
            item.addEventListener('mouseenter', function() {  
                item.style.backgroundColor = '#b388eb9d';  
            });  
            item.addEventListener('mouseleave', function() {  
                item.style.backgroundColor = '';   
            });  
        });  
    }else if(theme === 'theme-4') {
        document.body.style.background = 'linear-gradient(330deg, #44355b, #eca72c)';   
        const errorMessage = document.querySelector('.error-message');  
        errorMessage.style.color = '#221e22';   
        errorMessage.style.background = 'linear-gradient(45deg, #fbfbfb, #44355b)';   
        
        const todoTitle = document.querySelector('.todo__title');  
        todoTitle.style.color = '#221e22';  
    
        const todoInput = document.querySelector('.todo__input');  
        todoInput.style.outlineColor = '#eca72c';  
        
        const todoSubmitButton = document.querySelector('.todo__submit-button');  
        todoSubmitButton.style.backgroundColor = '#eca72c';  
        todoSubmitButton.style.background = '#eca72c';
    
    
        const todoTasks = document.querySelector('.todo__tasks');  
        todoTasks.style.scrollbarColor = '#eca72c transparent';  
    
        const style = document.createElement('style');  
        style.innerHTML = `  
            .todo__tasks::-webkit-scrollbar {  
                width: 2px;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb {  
                background-color: #eca72c;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb:hover {  
                background-color: #221e22;  
            }  
        `;  
        document.head.appendChild(style);  
        
        const menuItems = document.querySelectorAll('.menu li');  
        menuItems.forEach(item => {  
            item.addEventListener('mouseenter', function() {  
                item.style.backgroundColor = '#eca72c'; 
            });  
            item.addEventListener('mouseleave', function() {  
                item.style.backgroundColor = '';   
            });  
        }); 
    }else if(theme === 'theme-5') {
        document.body.style.background = 'linear-gradient(100deg, #BB5A5A, #BB5A5A)';   
        const errorMessage = document.querySelector('.error-message');  
        errorMessage.style.color = 'rgb(43 20 73)';  
        errorMessage.style.background = 'linear-gradient(45deg, #fbfbfb, #E79E85)';   
        
        const todoTitle = document.querySelector('.todo__title');  
        todoTitle.style.color = '#fbfbfb';     
        
        const todoInput = document.querySelector('.todo__input');  
        todoInput.style.outlineColor = '#E79E85';  
        
        const todoSubmitButton = document.querySelector('.todo__submit-button');  
        todoSubmitButton.style.background = 'linear-gradient(45deg, #BB5A5A, #E79E85)';  
    
        const todoTasks = document.querySelector('.todo__tasks');  
        todoTasks.style.scrollbarColor = '#E79E85 transparent';  
    
        const style = document.createElement('style');  
        style.innerHTML = `  
            .todo__tasks::-webkit-scrollbar {  
                width: 8px;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb {  
                background-color: #E79E85;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb:hover {  
                background-color: #EACEB4;  
            }  
        `;  
        document.head.appendChild(style);  
        
        const menuItems = document.querySelectorAll('.menu li');  
        menuItems.forEach(item => {  
            item.addEventListener('mouseenter', function() {  
                item.style.backgroundColor = '#EACEB4';  
            });  
            item.addEventListener('mouseleave', function() {  
                item.style.backgroundColor = '';   
            });  
        });  
    }else if(theme === 'theme-6') {
        document.body.style.background = 'linear-gradient(100deg, #3b1e54a1, #9b7ebd93)';   
        document.body.style.backgroundRepeat = 'no-repeat';  
        document.body.style.backgroundPosition = 'bottom';  
        document.body.style.backgroundSize = 'cover';  
    
        const errorMessage = document.querySelector('.error-message');  
        errorMessage.style.color = '#3B1E54';  
        errorMessage.style.background = 'linear-gradient(45deg, #D4BEE4, #9B7EBD)';    
        
        const todoTitle = document.querySelector('.todo__title');  
        todoTitle.style.color = '#fbfbfb';   
        
        const todoInput = document.querySelector('.todo__input');  
        todoInput.style.outlineColor = '#3B1E54';   
        
        const todoSubmitButton = document.querySelector('.todo__submit-button');  
        todoSubmitButton.style.background = '#9b7ebd42';
    
    
        const todoTasks = document.querySelector('.todo__tasks');  
        todoTasks.style.scrollbarColor = '#3B1E54 transparent';  
    
        const style = document.createElement('style');  
        style.innerHTML = `  
            .todo__tasks::-webkit-scrollbar {  
                width: 8px;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb {  
                background-color: #9B7EBD;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb:hover {  
                background-color: #3B1E54;  
            }  
        `;  
        document.head.appendChild(style);  
        
        const menuItems = document.querySelectorAll('.menu li');  
        menuItems.forEach(item => {  
            item.addEventListener('mouseenter', function() {  
                item.style.backgroundColor = '#D4BEE4';  
            });  
            item.addEventListener('mouseleave', function() {  
                item.style.backgroundColor = '';   
            });  
        });  
    }else if(theme === 'theme-7') {
        document.body.style.background = 'url("/imgs/blue-space-4k-phone-rlz84z3ar9x13g5n.jpg")';   
        document.body.style.backgroundRepeat = 'no-repeat';  
        document.body.style.backgroundPosition = 'bottom';  
        document.body.style.backgroundSize = 'cover';  
    
        const errorMessage = document.querySelector('.error-message');  
        errorMessage.style.color = 'rgb(43 20 73)';  
        errorMessage.style.background = 'linear-gradient(45deg, #fbfbfb, #55679C)';   
        
        const todoTitle = document.querySelector('.todo__title');  
        todoTitle.style.color = '#fbfbfb';     
        
        const todoInput = document.querySelector('.todo__input');  
        todoInput.style.outlineColor = '#55679C';  
        
        const todoSubmitButton = document.querySelector('.todo__submit-button');  
        todoSubmitButton.style.backgroundColor = '#7c93c341';   
        todoSubmitButton.style.background = '#7c93c341';
    
    
        const todoTasks = document.querySelector('.todo__tasks');  
        todoTasks.style.scrollbarColor = '#55679C transparent';  
    
        const style = document.createElement('style');  
        style.innerHTML = `  
            .todo__tasks::-webkit-scrollbar {  
                width: 8px;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb {  
                background-color: #55679C;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb:hover {  
                background-color: #1E2A5E;  
            }  
        `;  
        document.head.appendChild(style);  
        
        const menuItems = document.querySelectorAll('.menu li');  
        menuItems.forEach(item => {  
            item.addEventListener('mouseenter', function() {  
                item.style.backgroundColor = '#7C93C3';  
            });  
            item.addEventListener('mouseleave', function() {  
                item.style.backgroundColor = '';   
            });  
        });  
    }else if(theme === 'theme-8') {
        document.body.style.background = 'url("/imgs/purple-clouds-in-space-4k-phone-69xzx4tcctf9iesn.jpg")';   
        document.body.style.backgroundRepeat = 'no-repeat';  
        document.body.style.backgroundPosition = 'bottom';  
        document.body.style.backgroundSize = 'cover';  
    
        const errorMessage = document.querySelector('.error-message');  
        errorMessage.style.color = '#3B1E54';  // Darker color for text  
        errorMessage.style.background = 'linear-gradient(45deg, #D4BEE4, #9B7EBD)';  // Lighter background  
        
        const todoTitle = document.querySelector('.todo__title');  
        todoTitle.style.color = '#9B7EBD';  // Title color  
        
        const todoInput = document.querySelector('.todo__input');  
        todoInput.style.outlineColor = '#3B1E54';  // Input outline color  
        
        const todoSubmitButton = document.querySelector('.todo__submit-button');  
        todoSubmitButton.style.background = '#9b7ebd42';
    
    
        const todoTasks = document.querySelector('.todo__tasks');  
        todoTasks.style.scrollbarColor = '#3B1E54 transparent';  
    
        const style = document.createElement('style');  
        style.innerHTML = `  
            .todo__tasks::-webkit-scrollbar {  
                width: 8px;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb {  
                background-color: #9B7EBD;  
            }  
            .todo__tasks::-webkit-scrollbar-thumb:hover {  
                background-color: #3B1E54;  
            }  
        `;  
        document.head.appendChild(style);  
        
        const menuItems = document.querySelectorAll('.menu li');  
        menuItems.forEach(item => {  
            item.addEventListener('mouseenter', function() {  
                item.style.backgroundColor = '#D4BEE4';  // Lighter background on hover  
            });  
            item.addEventListener('mouseleave', function() {  
                item.style.backgroundColor = '';   
            });  
        });  
    }
    
} 

// آرایه‌ای از تم‌ها  
const themes = [  
    'theme-1',  
    'theme-2',  
    'theme-3',  
    'theme-4',  
    'theme-5',  
    'theme-6',  
    'theme-7',  
    'theme-8'  
];  

// تابع برای اعمال تم و ذخیره آن در localStorage  
function setTheme(theme) {  
    applyTheme(theme);  
    localStorage.setItem('selectedTheme', theme); // ذخیره تم در localStorage  
}  

// افزودن رویدادهای کلیک و لمس برای هر تم  
themes.forEach(theme => {  
    const themeElement = document.getElementById(theme);  
    
    // رویداد کلیک  
    themeElement.addEventListener('click', function() {  
        setTheme(theme);  
    });  
    
    // رویداد لمسی  
    themeElement.addEventListener('touchstart', function(event) {  
        event.preventDefault(); // جلوگیری از تداخل با رویداد کلیک  
        setTheme(theme);  
    });  
});  

// بارگذاری تم انتخاب شده از localStorage در شروع  
document.addEventListener('DOMContentLoaded', function() {  
    const selectedTheme = localStorage.getItem('selectedTheme');  
    if (selectedTheme) {  
        applyTheme(selectedTheme);  
    }  
});

// بارگذاری تم در ابتدای بارگذاری صفحه  
loadTheme();

// صفحه ی استارت
(function(){
    document.querySelector('.start-container').style.display = 'flex'
    document.querySelector('.todo__container').style.display = 'none'
    setTimeout(function(){
        document.querySelector('.start-container').classList.add('fade-out')
        document.querySelector('.todo__container').classList.add('fade')
    },4000)
    setTimeout(function(){
        document.querySelector('.start-container').style.display = 'none'
        document.querySelector('.todo__container').style.display = 'block'
    
    },4500)
}());

