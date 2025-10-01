# Employee Management System (Django + React)

A full-stack Employee Management System built using **Django REST Framework** (backend) and **React** (frontend).  
It supports authentication, CRUD operations, search, filtering, and role-based access.

---

## 🚀 Features
- Employee CRUD (Create, Read, Update, Delete)
- Authentication with tokens
- Search & Filter employees
- Department & Position fields
- Audit trail with created/updated by and timestamps
- React frontend with forms and search bar
- REST API tested with Postman

---

## 🛠️ Tech Stack
- **Backend:** Django, Django REST Framework
- **Frontend:** React + Axios
- **Database:** SQLite (default) / PostgreSQL (optional)
- **Auth:** Token-based Authentication

---

## ⚙️ Installation

### Backend (Django)
```bash
git clone <your_repo_url>
cd employeemanager
python -m venv venv
source venv/bin/activate   # on Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
