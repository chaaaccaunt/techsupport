# API Contract

Актуально по коду на 2026-03-11.
Источник: `src/controllers/*`, `src/services/*`, `src/database/models/*`.

## Base

- Base path: `/v1/gateway`
- Формат ответа:

```json
{
  "error": false,
  "status": 200,
  "result": {}
}
```

- При ошибке:

```json
{
  "error": true,
  "status": 4xx|5xx,
  "result": "Сообщение ошибки"
}
```

- Для `GET` query-параметры парсятся в `request.body`, поэтому в контракте ниже они описаны как query.
- Почти все защищённые методы требуют cookie/JWT через `httpTokenValidator`.

## Roles

- `1` — администратор
- `2` — расширенный пользователь оборудования
- `3` — пользователь заявок

## Pagination

Для всех `GET .../list`:

- обычные списки:
  - `limit`: `10..20`
  - `offset`: `0..10000`
- chat/ticket messages:
  - `limit`: `10..50`
  - `offset`: `0..10000`

## Common DTO

### Organization

```ts
{
  id: number;
  shortName: string;
  fullName: string;
}
```

### Department

```ts
{
  id: number
  shortName: string
  fullName: string
  organizationId: number
  organization?: Organization
}
```

### Position

```ts
{
  id: number
  shortName: string
  fullName: string
  organizationId: number
  organization?: Organization
}
```

### Requisite

```ts
{
  id: number
  organizationId: number
  kpp: string
  inn: string
  oktmo: string
  organization?: Organization
}
```

### Role

```ts
{
  id: number;
  name: string;
  description: string | null;
}
```

### Staff

`staff/list` и `staff/get` не возвращают вложенный `user`.

```ts
{
  id: number
  userUid: string
  organizationId: number
  departmentId: number
  positionId: number
  createdAt: string
  updatedAt: string
  organization?: Organization
  department?: Department
  position?: Position
  roles?: Role[]
}
```

### User

Пароль никогда не возвращается.

```ts
{
  uid: string
  login: string
  phone: string | null
  firstName: string
  lastName: string
  surname: string | null
  fullName: string | null
  avatarFileId: string | null
  createdAt: string
  updatedAt: string
  staff?: Staff[]
}
```

### Building

```ts
{
  id: number
  name: string
  address: string
  organizationId: number
  organization?: Organization
  locations?: Location[]
}
```

### Location

```ts
{
  id: number
  name: string
  buildingId: number
  area: number | null
  description: string | null
  building?: Building
}
```

### Equipment

Справочники `category` и `status` во `list/get` не инклюдятся. Фронт маппит их через `meta/bootstrap`.

```ts
{
  id: number
  name: string
  serialNumber: string
  inventoryNumber: string
  categoryId: number
  statusId: number
  locationId: number
  departmentId: number | null
  responsibleId: number | null
  createdAt: string
  updatedAt: string
  location?: Location & { building?: Building }
  department?: Department | null
  responsible?: Staff | null
  maintenances?: EquipmentMaintenance[]
  transfers?: EquipmentTransfer[]
}
```

### EquipmentMaintenance

```ts
{
  id: number
  equipmentId: number
  last: string | null
  next: string | null
  createdAt: string
  updatedAt: string
  equipment?: Equipment
}
```

### EquipmentTransfer

```ts
{
  id: number
  equipmentId: number
  transferDate: string
  fromResponsibleId: number | null
  toResponsibleId: number | null
  fromDepartmentId: number | null
  toDepartmentId: number | null
  createdByStaffId: number
  comment: string | null
  createdAt: string
  updatedAt: string
  equipment?: Equipment
  fromResponsible?: Staff | null
  toResponsible?: Staff | null
  fromDepartment?: Department | null
  toDepartment?: Department | null
  createdBy?: Staff
}
```

### Ticket

`status` и `priority` не инклюдятся. Фронт маппит по `statusId` и `priorityId` через `meta/bootstrap`.

```ts
{
  id: number
  title: string
  description: string
  adminComment: string | null
  rejectReason: string | null
  completedAt: string | null
  organizationId: number
  equipmentId: number | null
  requesterStaffId: number
  assigneeStaffId: number | null
  statusId: number
  priorityId: number
  createdAt: string
  updatedAt: string
  organization?: Organization
  equipment?: Equipment | null
  requester?: Staff
  assignee?: Staff | null
  room?: Room | null
}
```

### Room

```ts
{
  id: string
  type: "global" | "organization" | "department" | "group" | "private" | "ticket"
  name: string | null
  organizationId: number | null
  departmentId: number | null
  ticketId: number | null
  staffs?: Staff[]
  messages?: Message[]
  lastMessage?: Message | null
}
```

### Message

```ts
{
  id: string
  content: string
  roomId: string
  staffId: number
  createdAt: string
  updatedAt: string
  sender?: Staff
}
```

### Notification

```ts
{
  id: number;
  kind: string;
  category: string;
  text: string;
  severity: "warning" | "info" | "success" | "error";
  entityType: "created" | "updated" | "deleted";
  isRead: boolean;
  readAt: string | null;
  staffId: number;
  createdAt: string;
  updatedAt: string;
}
```

## Authorization

### `POST /authorization/login`

Без токена.

Payload:

```ts
{
  login: string; // email
  password: string; // min 8
}
```

Result:

```ts
Array<{ shortName: string; id: number }>;
```

Или, если у пользователя одна организация:

```ts
[];
```

Дополнительно сервер возвращает `headers.Set-Cookie`:

- auth cookie с JWT
- cookie `user` с URL-encoded JSON:

```ts
{
  id: number
  firstName: string
  lastName: string
  surname: string | null
  fullName: string | null
  email: string
  phone: string | null
  staff: null | {
    organization: { id: number; shortName: string; fullName: string }
    position: { id: number; fullName: string }
    department: { id: number; fullName: string }
    roles: Array<{ name: string; description: string | null }>
  }
}
```

Особенности:

- если организаций несколько, в `result` придёт список доступных организаций для выбора
- если профиль сотрудника неполный, возможен `409`

### `POST /authorization/select`

Требует токен после `login`.

Payload:

```ts
{
  id: number; // organizationId
}
```

Result:

```ts
true;
```

Дополнительно обновляет cookies так же, как `login`.

### `GET /authorization/logout`

Требует токен.

Result:

```ts
true;
```

Сервер также очищает cookies.

### `GET /authorization/state`

Требует токен.

Result:

```ts
true;
```

## Meta

### `GET /meta/bootstrap`

Требует токен.

Result:

```ts
{
  equipmentCategories: Array<{ id: number; name: string }>
  equipmentStatuses: Array<{ id: number; name: string }>
  ticketStatuses: Array<{ id: number; name: string; label: string }>
  ticketPriorities: Array<{ id: number; name: string; label: string }>
  roles: Role[]
}
```

## Organization

### `GET /organization/list`

Требует токен.

Query:

```ts
{
  limit: number;
  offset: number;
}
```

Result: `Organization[]`

Фактически возвращается только организация текущего пользователя.

### `GET /organization/get`

Требует токен.

Query:

```ts
{
  id: number;
}
```

Result:

```ts
Organization & {
  requisites?: Requisite[]
}
```

### `PATCH /organization/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  shortName?: string
  fullName?: string
}
```

Result: `Organization | false`

## Department

### `GET /department/list`

Требует токен.

Query: `{ limit, offset }`

Result: `Department[]`

### `GET /department/get`

Требует токен, роль `1`.

Query:

```ts
{
  id: number;
}
```

Result: `Department | null`

### `POST /department/create`

Требует токен, роль `1`.

Payload:

```ts
{
  shortName: string;
  fullName: string;
  organizationId: number;
}
```

Result: `Department`

### `PATCH /department/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  shortName?: string
  fullName?: string
  organizationId?: number
}
```

Result: `Department | false`

### `DELETE /department/delete`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number;
}
```

Result: `boolean`

Особенность: если в отделе есть сотрудники, сервер вернёт `409`.

## Position

### `GET /position/list`

Требует токен, роль `1`.

Query: `{ limit, offset }`

Result: `Position[]`

### `GET /position/get`

Требует токен, роль `1`.

Query: `{ id: number }`

Result: `Position | null`

### `POST /position/create`

Требует токен, роль `1`.

Payload:

```ts
{
  shortName: string;
  fullName: string;
  organizationId: number;
}
```

Result: `Position`

### `PATCH /position/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  shortName?: string
  fullName?: string
  organizationId?: number
}
```

Result: `Position | false`

### `DELETE /position/delete`

Требует токен, роль `1`.

Payload: `{ id: number }`

Result: `boolean`

Особенность: если должность назначена сотрудникам, сервер вернёт `409`.

## Requisite

### `GET /requisite/list`

Требует токен, роль `1`.

Query: `{ limit, offset }`

Result: `Requisite[]`

### `GET /requisite/get`

Требует токен, роль `1`.

Query: `{ id: number }`

Result: `Requisite | null`

### `POST /requisite/create`

Требует токен, роль `1`.

Payload:

```ts
{
  organizationId: number
  kpp?: string
  inn?: string
  oktmo?: string
}
```

Result: `Requisite`

### `PATCH /requisite/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  organizationId?: number
  kpp?: string
  inn?: string
  oktmo?: string
}
```

Result: `Requisite | false`

### `DELETE /requisite/delete`

Требует токен, роль `1`.

Payload: `{ id: number }`

Result: `boolean`

## Building

### `GET /building/list`

Требует токен, роль `1`.

Query: `{ limit, offset }`

Result: `Building[]`

### `GET /building/get`

Требует токен, роль `1`.

Query: `{ id: number }`

Result: `Building | null`

### `POST /building/create`

Требует токен, роль `1`.

Payload:

```ts
{
  name: string;
  address: string;
  organizationId: number;
}
```

Result: `Building`

### `PATCH /building/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  name?: string
  address?: string
  organizationId?: number
}
```

Result: `Building | false`

### `DELETE /building/delete`

Требует токен, роль `1`.

Payload: `{ id: number }`

Result: `boolean`

Особенность: если в здании есть помещения, сервер вернёт `409`.

## Location

### `GET /location/list`

Требует токен.

Query: `{ limit, offset }`

Result: `Location[]`

### `GET /location/get`

Требует токен, роль `1`.

Query: `{ id: number }`

Result: `Location | null`

### `POST /location/create`

Требует токен, роль `1`.

Payload:

```ts
{
  name: string
  buildingId: number
  area?: number
  description?: string
}
```

Result: `Location`

### `PATCH /location/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  name?: string
  buildingId?: number
  area?: number
  description?: string
}
```

Result: `Location | false`

### `DELETE /location/delete`

Требует токен, роль `1`.

Payload: `{ id: number }`

Result: `boolean`

Особенность: если в помещении есть оборудование, сервер вернёт `409`.

## Staff

### `GET /staff/list`

Требует токен.

Query: `{ limit, offset }`

Result: `Staff[]`

### `GET /staff/get`

Требует токен.

Query: `{ id: number }`

Result: `Staff | null`

### `POST /staff/create`

Требует токен, роль `1`.

Payload:

```ts
{
  userUid: string;
  organizationId: number;
  departmentId: number;
  positionId: number;
}
```

Result: `Staff`

### `PATCH /staff/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  userUid?: string
  organizationId?: number
  departmentId?: number
  positionId?: number
  roleIds?: number[]
}
```

Result: `Staff | false`

Особенность:

- `roleIds` обновляют назначения ролей сотруднику
- нельзя снять admin-роль с последнего администратора организации

### `DELETE /staff/delete`

Требует токен, роль `1`.

Payload: `{ id: number }`

Result: `boolean`

Особенность: нельзя удалить последнего администратора организации.

## User

### `GET /user/list`

Требует токен, роль `1`.

Query: `{ limit, offset }`

Result: `User[]`

Возвращаются только пользователи, у которых есть staff в организации текущего администратора.

### `GET /user/get`

Требует токен.

Query:

```ts
{
  uid: string;
}
```

Result: `User | null`

Обычный пользователь может получить только себя.

### `POST /user/create`

Требует токен, роль `1`.

Payload:

```ts
{
  login: string // email
  password: string // min 8
  phone?: string // ровно 10 символов
  firstName: string
  lastName: string
  surname?: string
}
```

Result: `User`

### `PATCH /user/update`

Требует токен, роль `1`.

Payload:

```ts
{
  uid: string
  login?: string
  password?: string
  phone?: string
  firstName?: string
  lastName?: string
  surname?: string
}
```

Result: `User | false`

### `PATCH /user/change-password`

Требует токен.

Payload:

```ts
{
  currentPassword: string;
  newPassword: string;
}
```

Result: `true | false`

Правила:

- endpoint меняет пароль только текущего авторизованного пользователя
- `uid` не передаётся
- `currentPassword` обязателен

### `DELETE /user/delete`

Требует токен, роль `1`.

Payload: `{ uid: string }`

Result: `boolean`

## Equipment Category

### `POST /equipment-category/create`

Требует токен, роль `1`.

Payload:

```ts
{
  name: string;
}
```

Result:

```ts
{
  id: number;
  name: string;
}
```

### `PATCH /equipment-category/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  name?: string
}
```

Result: `{ id: number, name: string } | false`

### `DELETE /equipment-category/delete`

Требует токен, роль `1`.

Payload: `{ id: number }`

Result: `boolean`

## Equipment Status

### `POST /equipment-status/create`

Требует токен, роль `1`.

Payload:

```ts
{
  name: string;
}
```

Result:

```ts
{
  id: number;
  name: string;
}
```

### `PATCH /equipment-status/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  name?: string
}
```

Result: `{ id: number, name: string } | false`

### `DELETE /equipment-status/delete`

Требует токен, роль `1`.

Payload: `{ id: number }`

Result: `boolean`

## Equipment

### `GET /equipment/list`

Требует токен, роли `1` или `2`.

Query: `{ limit, offset }`

Result: `Equipment[]`

### `GET /equipment/get`

Требует токен, роль `1`.

Query: `{ id: number }`

Result:

```ts
Equipment & {
  maintenances: EquipmentMaintenance[]
  transfers: EquipmentTransfer[]
}
```

### `GET /equipment/by-location`

Требует токен, роль `1`.

Query:

```ts
{
  locationId: number;
}
```

Result: `Equipment[]`

### `GET /equipment/by-responsible`

Требует токен, роль `1`.

Query:

```ts
{
  staffId: number;
}
```

Result: `Equipment[]`

### `POST /equipment/create`

Требует токен, роль `1`.

Payload:

```ts
{
  name: string
  serialNumber: string
  inventoryNumber: string
  categoryId: number
  statusId: number
  locationId: number
  departmentId?: number
  responsibleId?: number
}
```

Result: `Equipment`

### `PATCH /equipment/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  name?: string
  serialNumber?: string
  inventoryNumber?: string
  categoryId?: number
  statusId?: number
  locationId?: number
  departmentId?: number
  responsibleId?: number
}
```

Result: `Equipment | false`

### `GET /equipment/transfer/list`

Требует токен, роль `1`.

Query:

```ts
{
  equipmentId: number;
  limit: number;
  offset: number;
}
```

Result: `EquipmentTransfer[]`

### `POST /equipment/transfer/create`

Требует токен, роль `1`.

Payload:

```ts
{
  equipmentId: number
  transferDate: string
  toResponsibleId?: number | null
  toDepartmentId?: number | null
  comment?: string
}
```

Result: `Equipment | false`

Особенности:

- должен быть передан хотя бы один из `toResponsibleId` или `toDepartmentId`
- если передан только `toResponsibleId`, отдел может быть унаследован от сотрудника

### `DELETE /equipment/delete`

Требует токен, роль `1`.

Payload: `{ id: number }`

Result: `boolean`

## Equipment Maintenance

### `GET /equipment-maintenance/list`

Требует токен.

Query: `{ limit, offset }`

Result: `EquipmentMaintenance[]`

### `GET /equipment-maintenance/get`

Требует токен, роль `1`.

Query: `{ id: number }`

Result: `EquipmentMaintenance | null`

### `GET /equipment-maintenance/by-equipment`

Требует токен, роль `1`.

Query:

```ts
{
  equipmentId: number;
}
```

Result: `EquipmentMaintenance[]`

### `POST /equipment-maintenance/create`

Требует токен, роль `1`.

Payload:

```ts
{
  equipmentId: number
  last?: string
  next?: string
}
```

Result: `EquipmentMaintenance`

### `PATCH /equipment-maintenance/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  equipmentId?: number
  last?: string
  next?: string
}
```

Result: `EquipmentMaintenance | false`

### `DELETE /equipment-maintenance/delete`

Требует токен, роль `1`.

Payload: `{ id: number }`

Result: `boolean`

## Ticket

### `GET /ticket/list`

Требует токен, роли `1|2|3`.

Query: `{ limit, offset }`

Result: `Ticket[]`

### `GET /ticket/get`

Требует токен, роли `1|2|3`.

Query: `{ id: number }`

Result: `Ticket | null`

### `POST /ticket/create`

Требует токен, роли `1|2|3`.

Payload:

```ts
{
  title: string
  description: string
  organizationId?: number
  equipmentId?: number
  requesterStaffId?: number
  assigneeStaffId?: number
  statusId?: number
  priorityId?: number
}
```

Result: `Ticket | false`

Особенности:

- `requesterStaffId` фактически игнорируется, используется `actor.staffId`
- для не-админа `statusId` и `priorityId` подменяются на дефолтные значения
- при создании автоматически создаётся ticket-room

### `PATCH /ticket/update`

Требует токен, роль `1`.

Payload:

```ts
{
  id: number
  title?: string
  description?: string
  equipmentId?: number
  assigneeStaffId?: number
  statusId?: number
  priorityId?: number
  adminComment?: string
  rejectReason?: string
  completedAt?: string
}
```

Result: `Ticket | false`

### `DELETE /ticket/delete`

Требует токен, роль `1`.

Payload: `{ id: number }`

Result: `boolean`

### `GET /ticket/chat/messages`

Требует токен, роли `1|2|3`.

Query:

```ts
{
  ticketId: number;
  limit: number;
  offset: number;
}
```

Result: `Message[] | false`

`false` означает, что ticket-room не найден или пользователь не является участником.

## Chat

### `GET /chat/room/get`

Требует токен.

Query:

```ts
{
  roomId: string;
}
```

Result:

```ts
Room & {
  staffs: Staff[]
  messages: Message[] // последние 20, order DESC
}
```

Или `false`, если комнаты нет или нет доступа.

### `GET /chat/room/list`

Требует токен.

Query:

```ts
{
  limit: number;
  offset: number;
}
```

Result:

```ts
Array<
  Room & {
    staffs?: Staff[];
    lastMessage?: Message | null;
  }
>;
```

## File

### `GET /file/avatar/get`

Публичный.

Query:

```ts
{
  uid: string // fileId
  type?: "orig" | "hi" | "norm" | "low"
}
```

Result:

- бинарный файл
- `Content-Type` определяется по варианту

### `GET /file/chat/get`

Требует токен.

Query:

```ts
{
  uid: string // fileId
  type?: "orig" | "hi" | "norm" | "low"
}
```

Result:

- бинарный файл
- отдаётся как `attachment`
- доступ только участникам соответствующей комнаты

### `POST /file/upload/chat`

Требует токен.

Контент:

- `multipart/form-data`
- файл один
- form-field `roomId`

Result:

```ts
{
  id: string;
  roomId: string;
  ticketId: number | null;
}
```

### `POST /file/upload/avatar`

Требует токен.

Контент:

- `multipart/form-data`
- файл один

Допустимые avatar mime types:

- `image/jpeg`
- `image/png`
- `image/webp`

Result:

```ts
{
  id: string;
  userUid: string;
  avatarFileId: string;
}
```

## Notification

### `GET /notification/list`

Требует токен.

Query: `{ limit, offset }`

Result: `Notification[]`

### `PATCH /notification/read`

Требует токен.

Payload:

```ts
{
  id: number;
}
```

Result: `Notification | false`

### `PATCH /notification/read-all`

Требует токен.

Payload: не требуется.

Result:

```ts
number;
```

Количество обновлённых уведомлений.

## Business Rules

- `meta/bootstrap` — единственный read endpoint для статичных справочников.
- `equipment/list` и `ticket/list` отдают только `categoryId/statusId/priorityId`, а не полные справочники.
- `staff/list` и `staff/get` не содержат вложенный `user`.
- `user/list/get/update/delete` изолированы по организации администратора.
- `organization/get` публичен в рамках авторизованного контура и возвращает реквизиты организации.
- CRUD-операции по связанным сущностям публикуют socket events и создают уведомления, если сценарий это предусматривает.

## Typical Status Codes

- `200` — успех
- `401` — ошибка логина/пароля или невалидная авторизация
- `403` — недостаточно прав
- `404` — сущность не найдена
- `409` — конфликт бизнес-логики
- `413` — слишком большой файл
- `415` — неверный `Content-Type`
- `422` — невалидный payload
