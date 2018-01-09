# Date Service

Small docker-ready express web service for current date with timezone support from the [IANA Time Zone Database](https://www.iana.org/time-zones).

---

## Configuration

### Environment variables

* `APP_BASE` - App base path
* `WHITELIST_DOMAINS` - Comma-separated list of CORS allowed domains. Leave empty to allow any.

---

## API Endpoints

### GET /date

Get current date.

| Query parameter | Description                     |
| --------------- | ------------------------------- |
| **tz**          | Timezone in IANA TZ name format |

#### Example

GET http://example.com/date?tz=America/New_York

#### Result

```json
{ "date": "2018-01-09T08:17:12-05:00" }
```
