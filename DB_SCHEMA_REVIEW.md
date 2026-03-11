# DB Schema Review

Актуально по коду на 2026-03-11.
Источник: `src/database/models/*`, `src/services/*`, `src/controllers/*`.

## Tables

### users

- `uid` UUID, PK
- `login` STRING, NOT NULL, UNIQUE
- `phone` STRING, NULL
- `password` STRING, NOT NULL
- `firstName` STRING, NOT NULL
- `lastName` STRING, NOT NULL
- `surname` STRING, NULL
- `avatarFileId` UUID, NULL, FK -> `files.id`
- timestamps: `createdAt`, `updatedAt`
- soft delete: `deletedAt`

Relations:

- `users 1:N staff`
- `users 1:N files` as `uploadedFiles`
- `users N:1 files` as `avatar`

### organizations

- `id` INTEGER, PK, AI
- `shortName` STRING, NOT NULL
- `fullName` MEDIUMTEXT, NOT NULL
- timestamps: `createdAt`, `updatedAt`
- soft delete: `deletedAt`

Relations:

- `organizations 1:N departments`
- `organizations 1:N positions`
- `organizations 1:N staff`
- `organizations 1:N buildings`
- `organizations 1:N rooms`
- `organizations 1:N tickets`
- `organizations 1:1 requisites` by business semantics

### departments

- `id` INTEGER, PK, AI
- `shortName` STRING, NOT NULL
- `fullName` MEDIUMTEXT, NOT NULL
- `organizationId` INTEGER, NOT NULL, FK -> `organizations.id`
- timestamps: `createdAt`, `updatedAt`
- soft delete: `deletedAt`

Relations:

- `departments N:1 organizations`
- `departments 1:N staff`
- `departments 1:N equipments`
- `departments 1:N rooms`
- `departments 1:N equipment-transfers` as `fromTransfers`
- `departments 1:N equipment-transfers` as `toTransfers`

### positions

- `id` INTEGER, PK, AI
- `shortName` STRING, NOT NULL
- `fullName` MEDIUMTEXT, NOT NULL
- `organizationId` INTEGER, NOT NULL, FK -> `organizations.id`
- timestamps: `createdAt`, `updatedAt`
- soft delete: `deletedAt`

Relations:

- `positions N:1 organizations`
- `positions 1:N staff`

### requisites

- `id` INTEGER, PK, AI
- `organizationId` INTEGER, NOT NULL, FK -> `organizations.id`
- `kpp` STRING, NULL
- `inn` STRING, NULL
- `oktmo` STRING, NULL
- timestamps: `createdAt`, `updatedAt`

Relations:

- `requisites N:1 organizations`

### roles

Сейчас роли используются как системный глобальный справочник.

- `id` INTEGER, PK, AI
- `name` STRING, NOT NULL
- `description` TEXT, NULL
- `organizationId` INTEGER, NULL
- timestamps: no

Relations:

- `roles N:M staff` через `staff-roles`

### staff

- `id` INTEGER, PK, AI
- `userUid` UUID, NOT NULL, FK -> `users.uid`
- `organizationId` INTEGER, NOT NULL, FK -> `organizations.id`
- `departmentId` INTEGER, NOT NULL, FK -> `departments.id`
- `positionId` INTEGER, NOT NULL, FK -> `positions.id`
- timestamps: `createdAt`, `updatedAt`
- soft delete: `deletedAt`

Relations:

- `staff N:1 users`
- `staff N:1 organizations`
- `staff N:1 departments`
- `staff N:1 positions`
- `staff N:M roles` через `staff-roles`
- `staff N:M rooms` через `rooms-participant`
- `staff 1:N notifications`
- `staff 1:N equipments` as `responsible`
- `staff 1:N tickets` as `requester`
- `staff 1:N tickets` as `assignee`

### staff-roles

- `id` INTEGER, PK, AI
- `staffId` INTEGER, NOT NULL, FK -> `staff.id`
- `roleId` INTEGER, NOT NULL, FK -> `roles.id`
- timestamps: `createdAt`, `updatedAt`

Relations:

- `staff-roles N:1 staff`
- `staff-roles N:1 roles`

### staff-logs

- `id` INTEGER, PK, AI
- `message` TEXT, NOT NULL
- `staffId` INTEGER, NOT NULL, FK -> `staff.id`
- `creatorId` INTEGER, NOT NULL, FK -> `staff.id`
- `createdAt` DATE
- `updatedAt` DATE

Relations:

- `staff-logs N:1 staff` as `employee`

### buildings

- `id` INTEGER, PK, AI
- `name` STRING, NOT NULL
- `address` STRING, NOT NULL
- `organizationId` INTEGER, NOT NULL, FK -> `organizations.id`
- timestamps: no

Relations:

- `buildings N:1 organizations`
- `buildings 1:N locations`

### locations

- `id` INTEGER, PK, AI
- `name` STRING, NOT NULL
- `buildingId` INTEGER, NOT NULL, FK -> `buildings.id`
- `area` FLOAT, NULL
- `description` TEXT, NULL
- timestamps: no

Relations:

- `locations N:1 buildings`
- `locations 1:N equipments`

### equipment-categories

- `id` INTEGER, PK, AI
- `name` STRING, NOT NULL
- timestamps: no

Relations:

- `equipment-categories 1:N equipments`

### equipment-statuses

- `id` INTEGER, PK, AI
- `name` STRING, NOT NULL
- timestamps: no

Relations:

- `equipment-statuses 1:N equipments`

### equipments

- `id` INTEGER, PK, AI
- `name` STRING, NOT NULL
- `serialNumber` STRING, NOT NULL
- `inventoryNumber` STRING, NOT NULL
- `categoryId` INTEGER, NOT NULL, FK -> `equipment-categories.id`
- `statusId` INTEGER, NOT NULL, FK -> `equipment-statuses.id`
- `locationId` INTEGER, NOT NULL, FK -> `locations.id`
- `departmentId` INTEGER, NULL, FK -> `departments.id`
- `responsibleId` INTEGER, NULL, FK -> `staff.id`
- timestamps: `createdAt`, `updatedAt`
- soft delete: `deletedAt`

Relations:

- `equipments N:1 equipment-categories`
- `equipments N:1 equipment-statuses`
- `equipments N:1 locations`
- `equipments N:1 departments`
- `equipments N:1 staff` as `responsible`
- `equipments 1:N equipment-maintenances`
- `equipments 1:N equipment-transfers`
- `equipments 1:N tickets`

### equipment-maintenances

- `id` INTEGER, PK, AI
- `equipmentId` INTEGER, NOT NULL, FK -> `equipments.id`
- `last` DATEONLY, NULL
- `next` DATEONLY, NULL
- timestamps: `createdAt`, `updatedAt`
- soft delete: `deletedAt`

Relations:

- `equipment-maintenances N:1 equipments`

### equipment-transfers

- `id` INTEGER, PK, AI
- `equipmentId` INTEGER, NOT NULL, FK -> `equipments.id`
- `transferDate` DATE, NOT NULL
- `fromResponsibleId` INTEGER, NULL, FK -> `staff.id`
- `toResponsibleId` INTEGER, NULL, FK -> `staff.id`
- `fromDepartmentId` INTEGER, NULL, FK -> `departments.id`
- `toDepartmentId` INTEGER, NULL, FK -> `departments.id`
- `createdByStaffId` INTEGER, NOT NULL, FK -> `staff.id`
- `comment` TEXT, NULL
- timestamps: `createdAt`, `updatedAt`

Relations:

- `equipment-transfers N:1 equipments`
- `equipment-transfers N:1 staff` as `fromResponsible`
- `equipment-transfers N:1 staff` as `toResponsible`
- `equipment-transfers N:1 staff` as `createdBy`
- `equipment-transfers N:1 departments` as `fromDepartment`
- `equipment-transfers N:1 departments` as `toDepartment`

### ticket-statuses

- `id` INTEGER, PK, AI
- `name` STRING, NOT NULL, UNIQUE
- `label` STRING, NOT NULL
- timestamps: no

### ticket-priorities

- `id` INTEGER, PK, AI
- `name` STRING, NOT NULL, UNIQUE
- `label` STRING, NOT NULL
- timestamps: no

### tickets

- `id` INTEGER, PK, AI
- `title` STRING, NOT NULL
- `description` TEXT, NOT NULL
- `adminComment` TEXT, NULL
- `rejectReason` TEXT, NULL
- `completedAt` DATE, NULL
- `organizationId` INTEGER, NOT NULL, FK -> `organizations.id`
- `equipmentId` INTEGER, NULL, FK -> `equipments.id`
- `requesterStaffId` INTEGER, NOT NULL, FK -> `staff.id`
- `assigneeStaffId` INTEGER, NULL, FK -> `staff.id`
- `statusId` INTEGER, NOT NULL, FK -> `ticket-statuses.id`
- `priorityId` INTEGER, NOT NULL, FK -> `ticket-priorities.id`
- timestamps: `createdAt`, `updatedAt`
- soft delete: `deletedAt`

Relations:

- `tickets N:1 organizations`
- `tickets N:1 equipments`
- `tickets N:1 staff` as `requester`
- `tickets N:1 staff` as `assignee`
- `tickets N:1 ticket-statuses`
- `tickets N:1 ticket-priorities`
- `tickets 1:1 rooms`
- `tickets 1:N files`

### rooms

- `id` UUID, PK
- `type` ENUM(`global`, `organization`, `department`, `group`, `private`, `ticket`), NOT NULL
- `name` STRING, NULL
- `organizationId` INTEGER, NULL, FK -> `organizations.id`
- `departmentId` INTEGER, NULL, FK -> `departments.id`
- `ticketId` INTEGER, NULL, FK -> `tickets.id`
- timestamps: no

Relations:

- `rooms N:1 organizations`
- `rooms N:1 departments`
- `rooms N:1 tickets`
- `rooms N:M staff` через `rooms-participant`
- `rooms 1:N messages`
- `rooms 1:N files`

### rooms-participant

- `id` UUID, PK
- `roomId` UUID, NOT NULL, FK -> `rooms.id`
- `staffId` INTEGER, NOT NULL, FK -> `staff.id`
- timestamps: no

Relations:

- `rooms-participant N:1 rooms`
- `rooms-participant N:1 staff`

### messages

- `id` UUID, PK
- `content` TEXT, NOT NULL
- `roomId` UUID, NOT NULL, FK -> `rooms.id`
- `staffId` INTEGER, NOT NULL, FK -> `staff.id`
- timestamps: `createdAt`, `updatedAt`
- soft delete: `deletedAt`

Relations:

- `messages N:1 rooms`
- `messages N:1 staff` as `sender`
- `messages 1:N files`

### files

- `id` UUID, PK
- `kind` ENUM(`chat`, `avatar`), NOT NULL
- `originalName` STRING, NOT NULL
- `mimeType` STRING, NOT NULL
- `size` INTEGER, NOT NULL
- `originalPath` STRING, NOT NULL
- `hiPath` STRING, NOT NULL
- `normPath` STRING, NOT NULL
- `lowPath` STRING, NOT NULL
- `roomId` UUID, NULL, FK -> `rooms.id`
- `ticketId` INTEGER, NULL, FK -> `tickets.id`
- `messageId` UUID, NULL, FK -> `messages.id`
- `uploaderUid` UUID, NOT NULL, FK -> `users.uid`
- timestamps: `createdAt`, `updatedAt`
- soft delete: `deletedAt`

Relations:

- `files N:1 rooms`
- `files N:1 tickets`
- `files N:1 messages`
- `files N:1 users` as `uploader`

### notifications

- `id` INTEGER, PK, AI
- `kind` STRING, NOT NULL
- `category` STRING, NOT NULL
- `severity` STRING, NOT NULL, default `info`
- `text` TEXT, NOT NULL
- `entityType` STRING, NOT NULL
  - допустимые значения по коду: `created`, `updated`, `deleted`
- `isRead` BOOLEAN, NOT NULL, default `false`
- `readAt` DATE, NULL
- `staffId` INTEGER, NOT NULL, FK -> `staff.id`
- timestamps: `createdAt`, `updatedAt`

Relations:

- `notifications N:1 staff`

## Key ER Chains

- `organizations -> departments -> staff`
- `organizations -> positions -> staff`
- `organizations -> buildings -> locations -> equipments`
- `users -> staff`
- `staff <-> roles` через `staff-roles`
- `equipments -> equipment-maintenances`
- `equipments -> equipment-transfers`
- `tickets -> room -> messages`
- `rooms <-> staff` через `rooms-participant`
- `notifications -> staff`

## Read Models Used By Frontend

### Bootstrap

`GET /meta/bootstrap`:

- `equipmentCategories`
- `equipmentStatuses`
- `ticketStatuses`
- `ticketPriorities`
- `roles`

### Authorization

`login/select` после декодирования `user` cookie:

- профиль пользователя
- `staff.organization`
- `staff.position`
- `staff.department`
- `staff.roles`

### Organization

`organization/list`:

- только `id`, `shortName`, `fullName`

`organization/get`:

- организация
- `requisites`

### Department / Position / Requisite / Building

`list/get`:

- базовая сущность
- `organization` там, где сервис делает include

### Staff

`staff/list`, `staff/get`:

- `organization`
- `department`
- `position`
- `roles`
- без вложенного `user`

### Location

`location/list`, `location/get`:

- `building`

Плоские scalar fields:

- `id`
- `name`
- `buildingId`
- `area`
- `description`

### Equipment

`equipment/list`:

- `location -> building`
- `department`
- `responsible`
- без `category` и `status`

`equipment/get`:

- всё из `list`
- `maintenances`
- `transfers`

`equipment/transfer/list`:

- `equipment`
- `fromResponsible`
- `toResponsible`
- `fromDepartment`
- `toDepartment`
- `createdBy`

### Equipment Maintenance

- `equipment`
- `equipment.location`
- `equipment.location.building`

### Ticket

`ticket/list`, `ticket/get`:

- `organization`
- `equipment`
- `requester`
- `assignee`
- `room`
- без `status` и `priority`

`ticket/chat/messages`:

- `sender`

### Chat

`chat/room/get`:

- `staffs`
- `messages -> sender`

`chat/room/list`:

- `staffs` для приватных/групповых комнат по include
- `lastMessage`

### User

`user/list`, `user/get`, `user/update`:

- без `password`
- `staff`

### Notifications

Список плоский, без include:

- `id`
- `kind`
- `category`
- `severity`
- `text`
- `entityType`
- `isRead`
- `readAt`
- `staffId`
- `createdAt`

## Static Data In Redis

Ключи:

- `static:equipment-categories`
- `static:equipment-statuses`
- `static:ticket-statuses`
- `static:ticket-priorities`
- `static:roles`
- `static:bootstrap:org:{organizationId}`

Поведение:

- чтение через `StaticDataService`
- `equipment-category` и `equipment-status` после CRUD пересобирают кэш
- bootstrap кэшируется отдельно на организацию

## Important Notes For Frontend Verification

1. `staff.departmentId` и `staff.positionId` теперь обязательные.
2. `roles` в текущей модели глобальные системные записи с `organizationId = null`.
3. `notifications` больше не содержат `entityId`; вместо этого используются:
   - `kind`
   - `category`
   - `severity`
   - `entityType`
4. `equipment/list` и `ticket/list` рассчитаны на bootstrap-справочники на фронте.
5. `staff/list` и `staff/get` не возвращают вложенный `user`.
6. `ticket/create` по payload типу допускает `requesterStaffId`, но фактически использует `actor.staffId`.
