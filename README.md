# PsicoAgenda

Sistema de gestión de turnos para psicólogos y psiquiatras. Plataforma web moderna que permite a los profesionales de la salud mental gestionar sus citas, horarios y pacientes de manera eficiente.

## 📋 Descripción del Proyecto

PsicoAgenda es una solución integral para la administración de consultorios psicológicos y psiquiátricos. Proporciona funcionalidades para:

- **Gestión de Citas**: Programación flexible de turnos con confirmación automática
- **Gestión de Pacientes**: Registro y mantenimiento de datos de pacientes
- **Calendario**: Visualización semanal y mensual de disponibilidad
- **Notificaciones**: Recordatorios automáticos para pacientes
- **Historial**: Registro de citas pasadas y notas de sesiones
- **Autenticación**: Sistema seguro de acceso con rol-based permissions

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: [Laravel 12](https://laravel.com)
- **Autenticación**: [Laravel Breeze](https://laravel.com/docs/12.x/breeze)
- **Base de Datos**: MySQL
- **API**: RESTful API con validación
- **Testing**: PHPUnit / Pest

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org)
- **Lenguaje**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Package Manager**: pnpm

## 📁 Estructura del Proyecto

```
PsicoAgenda/
├── Backend/                 # API Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Middleware/
│   │   │   └── Requests/
│   │   └── Models/
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   ├── tests/
│   └── composer.json
│
├── Frontend/                # Aplicación Next.js
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   ├── public/
│   └── package.json
│
└── README.md
```

## 🚀 Instalación y Configuración

### Requisitos Previos

- PHP 8.2 o superior
- Node.js 18+ y pnpm
- MySQL 8.0+
- Composer
- Git

### Backend - Setup

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repo>
   cd PsicoAgenda/Backend
   ```

2. **Instalar dependencias**
   ```bash
   composer install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configurar la base de datos en `.env`**
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=psicoagenda
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Ejecutar migraciones**
   ```bash
   php artisan migrate
   ```

6. **Iniciar el servidor de desarrollo**
   ```bash
   php artisan serve
   ```

   El backend estará disponible en `http://localhost:8000`

### Frontend - Setup

1. **Navegar a la carpeta del frontend**
   ```bash
   cd Frontend
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```

4. **Configurar la URL del API backend en `.env.local`**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   pnpm dev
   ```

   El frontend estará disponible en `http://localhost:3000`

## 📚 Documentación de la API

### Endpoints Principales

#### Autenticación
- `POST /api/auth/register` - Registro de nuevos usuarios
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/logout` - Cierre de sesión
- `GET /api/auth/user` - Obtener datos del usuario autenticado

#### Citas
- `GET /api/appointments` - Listar citas
- `POST /api/appointments` - Crear nueva cita
- `GET /api/appointments/{id}` - Obtener detalles de cita
- `PUT /api/appointments/{id}` - Actualizar cita
- `DELETE /api/appointments/{id}` - Cancelar cita

#### Pacientes
- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Registrar nuevo paciente
- `GET /api/patients/{id}` - Obtener datos del paciente
- `PUT /api/patients/{id}` - Actualizar paciente

#### Disponibilidad
- `GET /api/availability/{professionalId}` - Obtener horarios disponibles
- `PUT /api/availability/{professionalId}` - Actualizar horarios

## 🧪 Testing

### Backend - Pruebas con Pest
```bash
cd Backend
php artisan test
```

### Frontend - Pruebas (si se configuren)
```bash
cd Frontend
pnpm test
```

## 📦 Despliegue

### Producción - Backend
```bash
cd Backend
composer install --no-dev
php artisan migrate --force
php artisan cache:clear
```

### Producción - Frontend
```bash
cd Frontend
pnpm install
pnpm build
pnpm start
```

## 🔐 Características de Seguridad

- Autenticación con Laravel Breeze
- Validación de solicitudes en el backend
- CORS configurado
- Protección CSRF
- Rate limiting en endpoints críticos
- Contraseñas hasheadas con bcrypt

## 🎨 Convenciones de Código

### Backend (Laravel)
- Naming: CamelCase para clases, snake_case para métodos/propiedades
- PSR-12 code style
- Validación en Form Requests
- Modelos con relaciones explícitas

### Frontend (Next.js)
- Naming: PascalCase para componentes, camelCase para funciones
- TypeScript para type safety
- Estructura de componentes reutilizables
- Hooks personalizados en `/src/hooks`

## 📝 Variables de Entorno

### Backend (.env)
```
APP_NAME=PsicoAgenda
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=psicoagenda
SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=PsicoAgenda
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado como solución para la gestión de consultorios de salud mental.

## 📞 Soporte

Para reportar bugs o sugerencias, crear un issue en el repositorio.

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026
