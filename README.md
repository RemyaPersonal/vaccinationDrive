
==================================================
          SCHOOL VACCINATION PORTAL API
==================================================

DESCRIPTION:
------------
This is a .NET 6 Web API for managing school vaccination data, including:
- User login (JWT token-based authentication)
- Student records management
- Vaccination drives creation and tracking
- Reporting and analytics features

TECHNOLOGIES USED:
------------------
- ASP.NET Core Web API (.NET 6)
- SQL Server
- Entity Framework (manual SQL via helper)
- Swagger (API Testing UI)
- JWT (JSON Web Token) for Authentication

INSTRUCTIONS TO RUN:
--------------------
1. Ensure SQL Server is running and available.
2. Create database tables using the schema provided in the code (see bottom).
3. Open the project in Visual Studio or run via CLI.
4. Update the SQL connection string in: `SqlHelper\Helper.cs`
5. Run the app:
   > dotnet run
6. Swagger UI will be available at:
   > http://localhost:<port>/swagger
# vaccinationDrive
#how to run react
#code . 
#npm run dev

AUTHENTICATION:
---------------
- First, generate a token from:
  > GET /api/token/GetToken
- Use the received token as Bearer in Authorization header for protected APIs.

API ENDPOINTS:
--------------
| Method | Endpoint                             | Description                      |
|--------|--------------------------------------|----------------------------------|
| POST   | /api/login                           | Login and validate credentials   |
| GET    | /api/token/GetToken                  | Generate JWT Token               |
| GET    | /api/dashboard/GetDashboard          | Fetch dashboard data             |
| POST   | /api/dashboard/AddStudent            | Add a new student                |
| POST   | /api/dashboard/ViewStudent           | View all students                |
| POST   | /api/dashboard/EditStudent           | Update student info              |
| POST   | /api/dashboard/AddDrive              | Add vaccination drive            |
| GET    | /api/dashboard/ListDrives            | List all drives                  |
| PUT    | /api/dashboard/UpdateDrive           | Update drive information         |
| POST   | /api/dashboard/UpcomingDrive         | Get upcoming drives              |
| POST   | /api/dashboard/MarkVaccination       | Mark student as vaccinated       |
| POST   | /api/dashboard/ViewStudentVaccination| View drive-specific vaccination  |
| GET    | /api/dashboard/ReportFilter          | Get filters for reports          |
| GET    | /api/dashboard/ReportView            | Generate final report            |

DATABASE TABLES:
----------------
1. TBL_USER_MASTER
2. TBL_STUDENT_MASTER
3. TBL_DRIVE
4. TBL_VACCINATION_DETAILS

NOTES:
------
- Ensure Swagger is enabled in Development environment.
- All business logic resides in `DataSource` classes.
- DTOs for request/response are organized under `DTO.Request` and `DTO.Response`.

CONTACT:
--------
For queries or assistance, contact: 2024tm93211@wilp.bits-pilani.ac.in




