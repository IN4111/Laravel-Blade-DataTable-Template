## Laravel-Blade-DataTable-Template
Blade Component with js helper class to build Functional Table design for Laravel project.
## Usage
```blade
<x-datatable :data="$data">
  {{-- your table here... --}}
</x-datatable>
```
```js
import DataTable from './DataTable';

document.addEventListener('DOMContentLoaded',function(){
    DataTable.init();
});
```

## Requirements
```text
  Laravel>12.0
  jQuery>=4.0.0
  Fontawesome-free>=7.1.0
```

## Component out come
<img width="1350" height="549" alt="image" src="https://github.com/user-attachments/assets/fb45a618-8e44-47a1-94cc-47397aabca4d" />

## Directory/File path
```text
Your_Project_Folder/
├── views/                       
│   └── components/              
│       └── datatable.blade.php  # Datatable blade component
.
.
.
└── resources/
    └── js/                    
        └── DataTable.js       # Datatable js helpers
```
