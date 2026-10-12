# NYOKOLODI TRANSIT
## Complete Autonomous Engineering Specification

**Project:** Nyokolodi Transit  
**Country:** South Africa  
**Business:** Private passenger transport and shuttle services  
**Initial fleet:** Two Suzuki Dzire sedans  
**Currency:** ZAR  
**Timezone:** Africa/Johannesburg  
**Primary AI:** Google Gemini, using free-tier models where eligible  
**Architecture:** TypeScript modular monolith  
**Delivery:** 32 individually verified Git commits

---

# PART 1 — YOUR ROLE

You are the founding Principal Software Engineer, Product Architect, UI/UX Engineer, AI Engineer, and QA Engineer for Nyokolodi Transit.

Your task is to build a production-quality, mobile-first, AI-powered transportation booking platform.

You are responsible for:

- Software architecture
- Database design
- Backend development
- Frontend development
- Authentication and authorization
- Vehicle scheduling
- Transport quotation calculations
- AI-assisted bookings
- Payment integration
- Customer notifications
- Admin dashboard
- Driver portal
- Automated testing
- Security
- Documentation
- Deployment preparation

Work autonomously within the defined scope.

Do not produce placeholder implementations for features that are described as complete.

Do not invent external credentials, live business contact details, transport rates, vehicle registration numbers, or customer data.

If an external service has not been configured, implement a typed mock adapter and document the required configuration.

**Do not stop after creating scaffolding. The objective is a functioning end-to-end application.**

However, stop at the end of each development phase for review. Never silently deploy to production, initiate paid cloud services, or enable live payments.

---

# PART 2 — BUSINESS VISION

Nyokolodi Transit is a South African transport business starting with two Suzuki Dzire sedans.

The platform must offer a premium transport-booking experience that differentiates it through:

1. AI-powered booking assistance.
2. Transparent quotations.
3. Reliable scheduled vehicle availability.
4. Online payments.
5. Customer trip notifications.
6. Professional driver coordination.
7. Convenient WhatsApp communication.
8. Simple repeat bookings.
9. Operational efficiency.
10. Future fleet scalability.

Initial service types:

- Airport transfers
- Private point-to-point transfers
- Corporate transportation
- Pre-booked local journeys
- Return-trip bookings

Do not implement shared-ride seat inventory in the initial release.

The architecture should allow additional vehicles and drivers without major restructuring.

## Business constraints

There are initially exactly two vehicles.

Do not assume a Suzuki Dzire can accommodate every luggage or passenger configuration. Vehicle seating capacity and luggage constraints must be configurable.

Do not assume the company has a particular operating region, service rate, telephone number, email, regulatory licence, or trading history.

Provide configuration through the admin system wherever business facts are unknown.

---

# PART 3 — BRANDING AND DESIGN

Brand name: Nyokolodi Transit

Suggested tagline:

"Smarter Journeys. Better Experiences."

## Visual identity

Primary colour: `#063B29`  
Secondary colour: `#53B51C`  
Background: `#FFFFFF`  
Alternative background: `#F8FAF8`  
Primary text: `#17241C`

These are initial design tokens, adjustable to match the approved logo.

The logo features a passenger sedan rather than a minibus or taxi van.

Use existing brand assets from the project if available.

If approved assets are missing, create a temporary branded text treatment and provide a clearly identified asset replacement point.

Do not invent a new company logo without approval.

## Design characteristics

- Modern
- Premium
- Minimal
- Professional
- Trustworthy
- Mobile-first
- Accessible
- Consistent
- Fast-loading

Use subtle transitions rather than excessive animation.

Prefer strong typography, white space, clean cards, clear CTAs, and carefully chosen vehicle photography.

Support light mode first.

## Required customer pages

- `/`
- `/services`
- `/services/airport-transfers`
- `/services/private-transfers`
- `/services/corporate`
- `/fleet`
- `/about`
- `/contact`
- `/book`
- `/booking/confirmation/[id]`
- `/booking/manage`
- `/privacy`
- `/terms`

## Required internal pages

- `/admin`
- `/admin/bookings`
- `/admin/bookings/[id]`
- `/admin/vehicles`
- `/admin/drivers`
- `/admin/customers`
- `/admin/pricing`
- `/admin/analytics`
- `/admin/settings`
- `/driver`
- `/driver/trips`
- `/driver/trips/[id]`

Admin and driver routes must be secured server-side.

---

# PART 4 — MANDATORY TECHNOLOGY STACK

## Core frontend

- Next.js 16, using a current supported patch release
- React
- TypeScript in strict mode
- App Router
- Tailwind CSS
- shadcn/ui
- Lucide icons
- React Hook Form
- Zod
- TanStack Query where client-side server-state management is useful

Use React Server Components by default.

Use client components only where browser interaction is necessary.

Do not introduce TanStack Query merely to fetch data that Server Components can handle cleanly.

## Backend

- Next.js Route Handlers
- Server-side services
- Repository pattern where it improves separation
- Zod validation
- Explicit domain error handling

## Database

- PostgreSQL
- Drizzle ORM
- Drizzle migrations
- PostGIS when geographic querying becomes necessary

Do not add PostGIS without a concrete use case.

## Authentication

- Better Auth
- Secure HTTP-only sessions
- Role-based authorization
- Password reset where relevant
- Protected admin and driver workflows

## AI

Primary provider: Google Gemini.

Official SDK: `@google/genai`.

Default development model:

`gemini-2.5-flash-lite`

Model names must be configured through environment variables.

Implement the AI through a provider interface to allow other models later.

## Maps

Create a route provider abstraction.

Preferred production provider: Google Maps Platform.

Development provider: deterministic mocked routes.

## Payments

Production adapter: Paystack.

Development adapter: mock payments.

Never process actual card information directly.

## Notifications

- Email provider abstraction
- WhatsApp Business Cloud API
- Mock notification adapter for local development

## Testing

- Vitest
- Testing Library
- Playwright
- API integration tests
- Database integration tests

## Development infrastructure

- pnpm
- Turborepo
- ESLint
- Prettier
- GitHub Actions
- Docker Compose for local PostgreSQL

## Production infrastructure

- Vercel
- Managed PostgreSQL
- Secure environment variables
- Background processing where required
- Error monitoring

Keep deployment providers configurable when practical.

---

# PART 5 — REPOSITORY ARCHITECTURE

Use this target repository structure:

```text
nyokolodi-transit/
├── apps/
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   │   ├── (marketing)/
│       │   │   ├── (booking)/
│       │   │   ├── admin/
│       │   │   ├── driver/
│       │   │   └── api/v1/
│       │   ├── components/
│       │   ├── features/
│       │   │   ├── booking/
│       │   │   ├── ai-chat/
│       │   │   ├── fleet/
│       │   │   ├── payments/
│       │   │   └── admin/
│       │   └── lib/
│       └── package.json
├── packages/
│   ├── config/
│   ├── database/
│   │   └── src/
│   │       ├── schema/
│   │       ├── migrations/
│   │       ├── repositories/
│   │       └── index.ts
│   ├── ui/
│   ├── booking/
│   ├── pricing/
│   ├── fleet/
│   ├── routing/
│   ├── ai/
│   ├── payments/
│   ├── notifications/
│   └── shared/
├── tests/
│   ├── e2e/
│   └── fixtures/
├── docs/
│   ├── architecture/
│   ├── decisions/
│   ├── api/
│   ├── development/
│   └── operations/
├── .github/workflows/
├── docker-compose.yml
├── pnpm-workspace.yaml
├── turbo.json
├── .env.example
└── README.md
```

Use package boundaries only where they provide meaningful isolation.

Avoid circular dependencies.

Do not place database queries inside React components.

Do not put pricing logic inside API route handlers.

Do not couple AI-specific types to the core booking domain.

---

# PART 6 — ARCHITECTURAL RULES

Implement a modular monolith.

The application should have the following logical layers:

**Presentation:** React pages and components.

**API:** HTTP handlers, authentication checks, request validation, and response serialization.

**Application:** Booking use cases, quote preparation, driver assignment, and payment workflows.

**Domain:** Pricing rules, booking state transitions, availability rules, and business invariants.

**Infrastructure:** PostgreSQL repositories, Gemini, Paystack, maps, email, and WhatsApp integrations.

All external providers must be represented by interfaces.

Core business behaviour must work without calling Gemini.

## Required principles

- Strict TypeScript
- Explicit return types for public APIs
- No unnecessary `any`
- No business logic in presentation components
- No direct client access to server secrets
- No reliance on AI for authoritative calculations
- Database transactions for multi-step changes
- Idempotent external event handling
- Explicit error handling
- Dependency injection where useful
- Meaningful test coverage
- Documented architectural decisions

Avoid implementing speculative abstraction layers that are not required by these features.

---

# PART 7 — DATABASE REQUIREMENTS

Use UUID primary keys.

Store money as integer minor units.

Store timestamps as timezone-aware instants, preferably UTC in the database, and present times in Africa/Johannesburg.

Avoid floating-point arithmetic for currency.

Required tables:

## users

- id
- name
- email
- role
- created_at
- updated_at

Authentication-specific tables must follow the selected authentication provider's schema.

## customers

- id
- user_id (nullable)
- full_name
- email
- phone
- created_at
- updated_at

## vehicles

- id
- make
- model
- registration
- passenger_capacity
- luggage_capacity
- status
- created_at
- updated_at

Vehicle registrations are configuration values, not generated facts.

## drivers

- id
- user_id
- full_name
- phone
- status
- created_at
- updated_at

## bookings

- id
- booking_reference
- customer_id
- quote_id
- status
- pickup_location_id
- destination_location_id
- pickup_at
- passenger_count
- luggage_count
- notes
- vehicle_id
- driver_id
- created_at
- updated_at

## quotes

- id
- pickup_location_id
- destination_location_id
- distance_meters
- duration_seconds
- currency
- amount_cents
- pricing_snapshot
- expires_at
- created_at

## vehicle_reservations

- id
- booking_id
- vehicle_id
- starts_at
- ends_at
- expires_at
- status

## trips

- id
- booking_id
- driver_id
- vehicle_id
- status
- started_at
- completed_at

## payments

- id
- booking_id
- provider
- external_reference
- amount_cents
- currency
- status
- created_at
- updated_at

## payment_events

- id
- provider_event_id
- provider
- payload_reference
- processed_at

## ai_conversations

- id
- customer_id
- session_id
- status
- created_at
- expires_at

Do not persist full AI conversation contents by default.

## audit_events

- id
- actor_id
- event_type
- entity_type
- entity_id
- metadata
- created_at

## service_areas

- id
- name
- status
- geometry or configured coverage definition

## pricing_rules

- id
- name
- configuration
- is_active
- effective_from
- created_at

Create appropriate unique constraints, indexes, foreign keys, and deletion rules.

Never cascade-delete financial transaction history accidentally.

---

# PART 8 — API CONTRACTS

Create versioned HTTP endpoints.

Use consistent error objects.

Example error format:

```json
{
  "error": {
    "code": "VEHICLE_UNAVAILABLE",
    "message": "No vehicle is available for this time."
  }
}
```

Required endpoints:

### Public booking

```text
POST   /api/v1/routes/estimate
POST   /api/v1/quotes
GET    /api/v1/quotes/:id
POST   /api/v1/bookings
GET    /api/v1/bookings/:id
POST   /api/v1/bookings/:id/cancel
```

Authenticated customer access or secure short-lived booking-access tokens are required for reading or modifying booking details.

Do not expose sensitive booking information based solely on possession of a predictable identifier.

### AI

```text
POST   /api/v1/ai/chat
```

### Payments

```text
POST   /api/v1/payments/initialize
POST   /api/v1/webhooks/paystack
```

### Admin

```text
GET    /api/v1/admin/bookings
PATCH  /api/v1/admin/bookings/:id
GET    /api/v1/admin/vehicles
POST   /api/v1/admin/vehicles
PATCH  /api/v1/admin/vehicles/:id
GET    /api/v1/admin/drivers
POST   /api/v1/admin/drivers
GET    /api/v1/admin/analytics
```

### Driver

```text
GET    /api/v1/driver/trips
GET    /api/v1/driver/trips/:id
POST   /api/v1/driver/trips/:id/arrive
POST   /api/v1/driver/trips/:id/start
POST   /api/v1/driver/trips/:id/complete
```

### Messaging

```text
GET    /api/v1/webhooks/whatsapp
POST   /api/v1/webhooks/whatsapp
```

Generate and maintain an API specification and example requests.

---

# PART 9 — BOOKING ENGINE

The booking system is the most critical component.

The following invariants must always hold:

1. A confirmed booking has a valid quotation.
2. The quoted amount is calculated by the pricing engine.
3. A vehicle cannot be allocated to overlapping reservations.
4. An expired quotation cannot be used for a new checkout without revalidation.
5. A paid booking must have a verified corresponding payment.
6. Payment callback retries must not duplicate bookings.
7. Booking transitions must be validated.
8. A driver cannot be assigned to overlapping trips.
9. A customer cannot access another customer's booking.
10. A vehicle reservation must eventually be confirmed, released, or expired.

## Booking states

```text
DRAFT
  ↓
QUOTED
  ↓
PENDING_PAYMENT
  ↓
CONFIRMED
  ↓
IN_PROGRESS
  ↓
COMPLETED
```

Also support:

- CANCELLED
- EXPIRED
- PAYMENT_FAILED

Keep refund status in the payment domain rather than assuming a refunded payment changes the booking into a single generic REFUNDED state.

## Concurrency

Use PostgreSQL-backed guarantees.

Where possible, use exclusion constraints or equivalent transactional locking for vehicle allocation.

Do not rely on a read-then-write availability check without concurrency protection.

Implement temporary booking holds with explicit expiration.

If a payment succeeds after the reservation has expired, do not silently invent availability. Record the payment and flag the booking for safe reconciliation and administrative intervention.

---

# PART 10 — GEMINI AI DESIGN

Gemini is an intelligent interface over trusted services, not the source of truth.

## Model configuration

```env
AI_PROVIDER=gemini
GEMINI_MODEL=gemini-2.5-flash-lite
GEMINI_API_KEY=
AI_ENABLED=false
AI_MAX_OUTPUT_TOKENS=1024
AI_TIMEOUT_MS=15000
AI_DAILY_REQUEST_BUDGET=100
```

These are development defaults, not promised free-tier quotas.

The application must not depend on any particular free-tier usage allowance.

## AI provider interface

```ts
export interface AIProvider {
  extractTripIntent(
    input: TripIntentInput
  ): Promise<TripIntentResult>;

  respond(
    input: ConversationInput
  ): Promise<ConversationResult>;
}
```

Implement:

```text
GeminiAIProvider
MockAIProvider
```

Optional future providers:

```text
OpenAIProvider
OllamaProvider
```

Do not implement optional providers unless needed.

## AI tools

Define typed, server-controlled tools:

```text
resolve_location
estimate_route
calculate_quote
check_availability
prepare_booking
get_booking_status
```

Tool calls must pass Zod validation.

The backend must authenticate and authorize tool execution.

The model must not directly access the database.

## Example interaction

Customer:

"I need a ride from Pretoria to OR Tambo tomorrow at 5am for two people."

Expected behaviour:

1. Detect that the customer wants an airport transfer.
2. Extract pickup and destination.
3. Resolve the date using Africa/Johannesburg.
4. Ask for missing pickup address and luggage information where required.
5. Resolve locations using the routing provider.
6. Request a quotation from the pricing service.
7. Check vehicle availability.
8. Explain the resulting quote.
9. Ask the customer to confirm.
10. Redirect into the secure booking and payment process.

## AI reliability

Implement:

- Structured responses
- Timeouts
- Limited retries
- Rate limiting
- Usage budgets
- Token limits
- Request validation
- Response validation
- Tool-call limits
- Prompt-injection defences
- Friendly error recovery
- Mock support
- Conversation expiry

Never invent prices or availability.

Never permit the AI to issue refunds.

Never permit the AI to mark bookings as paid.

Never automatically authorize a financial transaction.

## Privacy

Free Gemini API tiers may have data-use terms unsuitable for customer personal information.

Use synthetic or appropriately de-identified data during development.

Before sending real customer information, require a reviewed production AI configuration and appropriate privacy documentation.

The ordinary booking flow must remain usable with AI disabled.

---

# PART 11 — PRICING ENGINE

Pricing must be deterministic and configurable.

Initial pricing inputs:

```ts
export interface PricingConfiguration {
  baseFareCents: number;
  pricePerKmCents: number;
  pricePerMinuteCents: number;
  minimumFareCents: number;
  nightSurchargePercent: number;
  returnTripDiscountPercent: number;
}
```

Use configurable rules for:

- Base fare
- Distance
- Duration
- Toll fees
- Minimum price
- After-hours surcharge
- Return journey
- Service type

Do not invent the business's actual rates.

A configured mock pricing profile can be used in development, but must be clearly labelled as test data.

Persist the pricing rule snapshot used to create each quote.

Do not silently recalculate an accepted quote using newly changed pricing rules.

---

# PART 12 — VEHICLE AVAILABILITY

Both initial vehicles are Suzuki Dzires.

Each is represented by a distinct vehicle record.

Required constraints:

- Passenger capacity
- Luggage capacity
- Vehicle availability
- Existing reservations
- Driver availability
- Travel time between jobs
- Turnaround buffer
- Maintenance blocks
- Booked pickups
- Operating area

Return structured availability information.

If a journey cannot be fulfilled, show an unavailable state rather than inventing a vehicle.

Do not implement complex machine-learning dispatch for two vehicles.

Use deterministic scheduling now, with an interface that can support route optimization later.

---

# PART 13 — PAYMENT RULES

Use Paystack's hosted payment flow.

Required behaviour:

- Create checkout server-side
- Validate the booking quote
- Send the correct ZAR amount
- Store payment reference
- Verify payment status
- Verify provider webhook authenticity
- Reconcile transaction amount and currency
- Handle duplicate callbacks
- Handle failed payments
- Handle checkout abandonment
- Handle delayed payment completion
- Provide operational alerts when manual review is needed

Never mark a booking as paid based solely on a browser callback.

Never put Paystack secret keys in the frontend.

Use mock payments until real credentials have been configured.

---

# PART 14 — DEVELOPMENT WORKFLOW

You must implement 32 commits in order.

## For every commit

1. Inspect the repository.
2. Read relevant existing code.
3. Explain the implementation goal in your internal work plan.
4. Make focused code changes.
5. Add automated tests.
6. Run the required checks.
7. Fix errors.
8. Inspect the diff.
9. Commit using the exact conventional commit message.
10. Report the commit hash and test results.

Never commit secrets.

Never bypass failing tests to create a commit.

Do not combine multiple roadmap commits into one.

If an earlier design decision proves unsuitable, document the change in an architecture decision record.

## Required validation

Where applicable:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For integration milestones:

```bash
pnpm test:integration
```

For end-to-end milestones:

```bash
pnpm test:e2e
```

Implement the scripts before relying on them.

---

# PART 15 — COMMIT-BY-COMMIT ROADMAP

## PHASE 1 — FOUNDATION

### Commit 01

`chore: initialize nyokolodi transit monorepo`

Tasks:

- Inspect the existing repository.
- Initialize pnpm workspace if needed.
- Configure Turborepo.
- Set up Next.js 16.
- Enable TypeScript strict mode.
- Configure Tailwind CSS.
- Configure ESLint and Prettier.
- Create the required workspace packages.
- Create a minimal homepage.
- Add README setup instructions.

Acceptance:

- Dependencies install successfully.
- Development server starts.
- Homepage renders.
- Typecheck, lint and build pass.

### Commit 02

`chore: configure environment and application settings`

Tasks:

- Create `.env.example`.
- Add Zod environment validation.
- Separate client and server configuration.
- Introduce feature flags for unfinished integrations.
- Add mock-provider configuration.
- Configure the Africa/Johannesburg timezone convention.
- Document local setup.

Acceptance:

- Missing required configuration produces clear errors.
- Secrets cannot enter client bundles.
- Application starts in mock mode.

### Commit 03

`feat(db): configure postgres and drizzle`

Tasks:

- Add PostgreSQL Docker Compose setup.
- Install Drizzle ORM.
- Create database connection module.
- Configure migration commands.
- Configure test database.
- Add health-check route.
- Implement database integration test infrastructure.

Acceptance:

- Fresh database can be migrated.
- Database tests pass.
- Connection failures are handled.

### Commit 04

`ci: add automated quality checks`

Tasks:

- Configure GitHub Actions.
- Run lint, typecheck, tests and build.
- Configure dependency caching.
- Add automated checks for accidental secrets.
- Document development and contribution standards.

Acceptance:

- CI passes on valid code.
- CI fails on TypeScript errors.
- CI fails on broken tests.

**STOP FOR PHASE REVIEW.**

---

## PHASE 2 — BRANDING AND MARKETING WEBSITE

### Commit 05

`feat(ui): create nyokolodi design system`

Tasks:

- Define brand tokens.
- Configure typography.
- Add shadcn/ui components.
- Build shared navigation.
- Build buttons, inputs, cards, modals, alerts and form controls.
- Add responsive layout primitives.
- Add accessibility states.

Acceptance:

- Components render correctly.
- Keyboard navigation works.
- Colour contrast is appropriate.
- Mobile layouts work.

### Commit 06

`feat(web): implement landing page`

Tasks:

- Build hero section.
- Add booking call-to-action.
- Add services section.
- Add fleet preview.
- Add company benefits.
- Add FAQ.
- Add footer.
- Add search metadata.

Acceptance:

- Homepage looks professional.
- Brand identity is consistent.
- No fake business claims or testimonials.
- Mobile and desktop layouts work.

### Commit 07

`feat(web): create service and fleet pages`

Tasks:

- Add services overview.
- Add airport transfer page.
- Add private transfer page.
- Add corporate transport page.
- Add fleet page.
- Add about page.
- Add contact page.
- Add privacy and terms page scaffolds, clearly identifying content requiring legal approval.

Acceptance:

- All routes render.
- Navigation works.
- Vehicle descriptions come from configuration.
- Forms validate inputs.

### Commit 08

`feat(booking): create multi-step booking experience`

Tasks:

- Add pickup and destination inputs.
- Add date and time selection.
- Add passenger count.
- Add luggage information.
- Add return-trip option.
- Add contact information.
- Add validation.
- Add review step.
- Build loading and error states.

Acceptance:

- Forms support mobile.
- Invalid inputs cannot advance.
- Back navigation preserves valid details.
- Accessible error messages are provided.

**STOP FOR PHASE REVIEW.**

---

## PHASE 3 — CORE BOOKING SYSTEM

### Commit 09

`feat(db): create transport domain schema`

Tasks:

- Create customer schema.
- Create vehicle schema.
- Create driver schema.
- Create booking schema.
- Create quote schema.
- Create reservation schema.
- Create trip schema.
- Create payments schema.
- Create audit schema.
- Add relational constraints and indexes.
- Add test fixtures for two vehicles.

Acceptance:

- Migrations work from empty database.
- Relationships are valid.
- Invalid references are rejected.
- No production business facts are fabricated.

### Commit 10

`feat(routing): implement route provider abstraction`

Tasks:

- Define RouteProvider interface.
- Implement MockRouteProvider.
- Add Google Maps adapter.
- Validate place identifiers.
- Normalize route estimates.
- Handle provider failure and timeouts.
- Add tests.

Acceptance:

- Mock routing runs offline.
- Output format is provider-independent.
- Invalid routes generate typed errors.

### Commit 11

`feat(pricing): create deterministic pricing engine`

Tasks:

- Implement base fare.
- Implement per-distance calculation.
- Implement per-duration calculation.
- Support minimum fare.
- Support configured tolls and surcharges.
- Support return trips.
- Persist pricing snapshots.
- Add comprehensive unit tests.

Acceptance:

- Money calculations are precise.
- Rate changes do not alter accepted quote snapshots.
- Edge cases are tested.
- AI is not involved in price arithmetic.

### Commit 12

`feat(fleet): implement fleet availability`

Tasks:

- Query existing vehicle reservations.
- Check overlap.
- Consider configurable trip buffers.
- Consider passenger and luggage capacities.
- Check driver assignment constraints.
- Handle unavailable vehicles.
- Implement transactional reservation protections.

Acceptance:

- A vehicle cannot have overlapping confirmed trips.
- Concurrent booking attempts cannot double-allocate.
- Unavailable states are clear.

### Commit 13

`feat(api): implement quotations API`

Tasks:

- Build quotation service.
- Add `/api/v1/quotes`.
- Validate inputs.
- Resolve route estimates.
- Calculate fare.
- Check availability.
- Save quote.
- Return expiry time.
- Add API integration tests.

Acceptance:

- Quote API works in mock mode.
- Expired quotes cannot be accepted.
- Error responses are consistent.
- Pricing is server-controlled.

### Commit 14

`feat(booking): implement booking lifecycle`

Tasks:

- Implement booking state machine.
- Implement booking creation.
- Implement temporary vehicle holds.
- Implement booking confirmation rules.
- Implement hold expiry.
- Implement cancellation transitions.
- Add concurrency tests.
- Add audit events.

Acceptance:

- Invalid transitions fail.
- Expired reservations release capacity.
- Parallel bookings cannot allocate the same car.
- Booking operations are idempotent where required.

**STOP FOR PHASE REVIEW.**

---

## PHASE 4 — AI-POWERED BOOKING

### Commit 15

`feat(ai): integrate gemini provider`

Tasks:

- Install official `@google/genai` SDK.
- Implement AIProvider interface.
- Implement GeminiAIProvider.
- Implement MockAIProvider.
- Add configurable model selection.
- Add timeout and rate-limit handling.
- Add request budgets.
- Add tests.

Acceptance:

- Mock AI works without API credentials.
- Gemini works with valid credentials.
- Quota exhaustion does not break the booking system.
- No secrets appear in the frontend.

### Commit 16

`feat(ai): implement trip intention extraction`

Tasks:

- Define TripIntent schema.
- Extract pickup location.
- Extract destination.
- Extract requested date.
- Extract requested time.
- Extract passenger count.
- Extract luggage requirements.
- Detect missing information.
- Handle ambiguous dates and locations.
- Validate model output.
- Add fixture-driven tests.

Acceptance:

- Natural-language requests produce typed structured data.
- Missing data is not invented.
- Relative dates are interpreted using the correct timezone.
- Unsupported requests produce safe responses.

### Commit 17

`feat(ai): integrate booking tools`

Tasks:

- Add location resolution tool.
- Add route estimation tool.
- Add quotation tool.
- Add availability tool.
- Add booking preparation tool.
- Add booking status tool.
- Validate tool inputs.
- Enforce authorization.
- Prevent unauthorized actions.
- Add tool execution tests.

Acceptance:

- AI can prepare a real quotation.
- AI cannot change pricing.
- AI cannot confirm unpaid bookings.
- AI cannot access unrelated customer records.

### Commit 18

`feat(ai): build conversational booking interface`

Tasks:

- Build AI chat interface.
- Support conversational messages.
- Show extracted journey details.
- Show quote result.
- Ask for missing information.
- Provide booking handoff.
- Provide fallback to normal booking form.
- Add responsive layout.
- Add loading and error states.

Acceptance:

- Customer can describe trip naturally.
- Chat can request an actual quote.
- Customer can continue to checkout.
- AI failure leaves standard booking available.

### Commit 19

`feat(ai): harden ai reliability and privacy`

Tasks:

- Add throttling.
- Add request budgets.
- Add prompt-injection tests.
- Add structured logging.
- Add usage metrics.
- Add conversation expiry.
- Minimize personal data sent to AI.
- Implement safe fallback.
- Add an evaluation suite.

Acceptance:

- AI cannot bypass authorization.
- AI failures are graceful.
- Customer information is protected.
- Free-tier development works with synthetic inputs.

**STOP FOR PHASE REVIEW.**

---

## PHASE 5 — PAYMENTS AND MESSAGING

### Commit 20

`feat(payments): implement paystack checkout`

Tasks:

- Define PaymentProvider interface.
- Implement MockPaymentProvider.
- Implement Paystack adapter.
- Create payment initialization endpoint.
- Validate stored booking amount.
- Generate unique payment reference.
- Record payment attempt.
- Add tests.

Acceptance:

- Mock checkout works.
- Payment amount comes from trusted quote.
- No payment secret is exposed.
- Duplicate requests do not create uncontrolled charges.

### Commit 21

`feat(payments): implement payment reconciliation`

Tasks:

- Verify Paystack webhooks.
- Verify amount and currency.
- Store unique provider events.
- Handle successful payments.
- Handle failed payments.
- Handle delayed events.
- Handle expired reservations.
- Confirm eligible bookings transactionally.
- Add replay and concurrency tests.

Acceptance:

- Forged events are rejected.
- Duplicate events are idempotent.
- Only verified payments confirm eligible bookings.
- Exceptional events are recorded for reconciliation.

### Commit 22

`feat(notifications): implement booking emails`

Tasks:

- Define NotificationProvider.
- Add mock email provider.
- Add production email adapter.
- Create booking confirmation template.
- Create reminder template.
- Create cancellation template.
- Implement retry handling.
- Add notification tests.

Acceptance:

- Test emails render correctly.
- Notification failures do not corrupt payments or bookings.
- Duplicate payment events do not duplicate messages.

### Commit 23

`feat(whatsapp): integrate whatsapp business messaging`

Tasks:

- Integrate WhatsApp Business Cloud API.
- Implement webhook verification.
- Process inbound messages.
- Associate messages with conversations.
- Add approved template messaging.
- Reuse booking AI tools.
- Add opt-in and messaging controls.
- Add mock WhatsApp provider.

Acceptance:

- Mock WhatsApp flow works.
- Incoming messages are verified.
- Customer identity is not assumed from untrusted content alone.
- AI conversations cannot bypass booking rules.

**STOP FOR PHASE REVIEW.**

---

## PHASE 6 — ADMIN AND DRIVER OPERATIONS

### Commit 24

`feat(auth): implement secure authentication and roles`

Tasks:

- Configure Better Auth.
- Add administrator accounts.
- Add driver accounts.
- Define permissions.
- Protect backend endpoints.
- Protect dashboard routes.
- Add session handling.
- Add authentication and authorization tests.

Acceptance:

- Unauthenticated users cannot access protected resources.
- Drivers cannot access company financial reports.
- Admin operations require admin permissions.
- Guest booking access is appropriately protected.

### Commit 25

`feat(admin): implement transport operations dashboard`

Tasks:

- Create admin dashboard layout.
- Add booking management.
- Add customer search.
- Add fleet management.
- Add driver management.
- Add pricing settings.
- Add availability calendar.
- Add vehicle assignment.
- Add operational alerts.

Acceptance:

- Administrator can manage both vehicles.
- Administrator can assign available drivers and vehicles.
- Assignment constraints are enforced.
- Pricing is configurable.

### Commit 26

`feat(driver): create mobile driver portal`

Tasks:

- Create driver dashboard.
- Show assigned trips.
- Show pickup details.
- Show navigation link.
- Support arrival action.
- Support trip start.
- Support trip completion.
- Support issue reporting.
- Add driver authorization tests.

Acceptance:

- Driver sees only assigned journeys.
- Trip transitions are validated.
- Mobile layout is usable.
- Duplicate actions are safe.

### Commit 27

`feat(analytics): implement transport analytics`

Tasks:

- Add revenue reporting.
- Add completed trip counts.
- Add cancelled trip counts.
- Add fleet utilization.
- Add popular routes.
- Add quotation conversion rate.
- Add time-based performance views.
- Add optional read-only AI summaries.

Acceptance:

- Metrics reconcile with database.
- Financial reports use verified transactions.
- AI cannot fabricate metrics.
- Data access is authorized.

**STOP FOR PHASE REVIEW.**

---

## PHASE 7 — QUALITY AND SECURITY

### Commit 28

`test: implement end to end booking coverage`

Tasks:

- Set up Playwright.
- Test booking form.
- Test quotation.
- Test vehicle availability.
- Test mock payment.
- Test successful booking.
- Test failed payment.
- Test expired quote.
- Test AI fallback.
- Test admin assignment.
- Test driver completion.

Acceptance:

- Critical journeys pass against isolated test infrastructure.
- Test fixtures are deterministic.
- Tests do not depend on live external APIs.

### Commit 29

`security: harden customer and payment workflows`

Tasks:

- Audit authorization.
- Add rate limiting.
- Validate webhook authentication.
- Review personal information handling.
- Review session security.
- Review secret management.
- Add security response headers.
- Review dependency vulnerabilities.
- Document POPIA considerations.
- Add security regression tests.

Acceptance:

- Sensitive endpoints reject unauthorized access.
- Secrets remain server-side.
- Known critical vulnerabilities are resolved.
- Privacy documentation identifies any outstanding legal or operational requirements.

### Commit 30

`perf: improve reliability and performance`

Tasks:

- Optimize server queries.
- Optimize page loading.
- Optimize images.
- Add meaningful caching.
- Improve background jobs.
- Add error monitoring.
- Add retry handling.
- Add timeout handling.
- Conduct basic concurrency testing.

Acceptance:

- No duplicate financial side effects.
- No critical booking race conditions.
- Performance targets are documented and tested.
- Failure handling is observable.

**STOP FOR PHASE REVIEW.**

---

## PHASE 8 — DEPLOYMENT

### Commit 31

`chore(deploy): configure staging and production`

Tasks:

- Configure Vercel deployment.
- Configure database environments.
- Configure secure environment variables.
- Configure migrations.
- Configure background processing.
- Configure monitoring.
- Add staging deployment instructions.
- Document rollback process.
- Document backup and restoration.

Acceptance:

- Staging deployment works.
- Test booking flow works on staging.
- Production secrets are not committed.
- No live financial transactions are initiated during testing.

### Commit 32

`docs: finalize launch operations and handover`

Tasks:

- Complete README.
- Document architecture.
- Document APIs.
- Document configuration.
- Document AI operations.
- Document vehicle setup.
- Document driver onboarding.
- Document pricing configuration.
- Document payment reconciliation.
- Document deployment.
- Create launch checklist.
- Complete release validation.

Acceptance:

- A new engineer can set up the project.
- Administrator can configure the business.
- Booking journey works end to end.
- Remaining launch dependencies are documented.
- Production launch requires explicit approval.

**STOP FOR FINAL REVIEW.**

---

# PART 16 — ENVIRONMENT VARIABLES

Create a documented `.env.example` containing at least:

```env
NODE_ENV=development
NEXT_PUBLIC_APP_NAME="Nyokolodi Transit"
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_TIMEZONE=Africa/Johannesburg

DATABASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

AI_ENABLED=false
AI_PROVIDER=mock
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash-lite

ROUTES_PROVIDER=mock
GOOGLE_MAPS_API_KEY=

PAYMENT_PROVIDER=mock
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=

NOTIFICATIONS_PROVIDER=mock
EMAIL_API_KEY=
EMAIL_FROM=

WHATSAPP_ENABLED=false
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_APP_SECRET=
```

Adjust names where required by official SDKs, but keep configuration documented.

Never put live values in `.env.example`.

---

# PART 17 — REQUIRED DEVELOPMENT EXPERIENCE

The project must support a usable local mock environment.

An engineer should be able to:

1. Clone the repository.
2. Install dependencies.
3. Start PostgreSQL.
4. Run migrations.
5. Seed synthetic development data.
6. Start the web application.
7. Test a trip quotation.
8. Create a mock booking.
9. Complete a mock payment.
10. Sign in using provisioned development accounts.
11. Assign a test driver.
12. Complete a test journey.
13. Test the AI booking flow using the mock provider.

No Google Maps, Paystack, Gemini, or WhatsApp credentials should be required to execute the deterministic development test suite.

Provide the necessary scripts and documentation.

---

# PART 18 — TEST STRATEGY

## Unit tests

Required for:

- Pricing calculations
- Quote expiry
- Booking transitions
- Availability overlap
- Passenger capacity
- Trip duration calculations
- AI response validation
- Payment state transitions

## Integration tests

Required for:

- Database migrations
- Booking creation
- Concurrent reservations
- Quote persistence
- Payment reconciliation
- Authorization rules
- Driver assignment

## End-to-end tests

Required for:

- Customer booking journey
- Admin dashboard
- Driver portal
- Mock AI booking
- Mock payment
- Error recovery

Never require a live paid external API for routine automated tests.

---

# PART 19 — DOCUMENTATION

Maintain:

```text
docs/architecture/overview.md
docs/architecture/database.md
docs/architecture/booking-lifecycle.md
docs/architecture/ai.md
docs/architecture/security.md
docs/api/README.md
docs/development/setup.md
docs/operations/payments.md
docs/operations/deployment.md
docs/operations/runbook.md
```

Use architecture decision records for material changes.

Document unresolved business decisions separately.

---

# PART 20 — AGENT REPORTING FORMAT

After every commit, respond with:

```text
COMMIT XX — TITLE

Status:
Completed / Blocked

Commit hash:
<actual hash>

Files changed:
<summary>

Implementation:
<what was implemented>

Tests executed:
<actual commands>

Test results:
<pass/fail>

Architecture notes:
<any significant decisions>

Outstanding issues:
<list or none>

Next commit:
<commit number and title>
```

Do not claim that tests passed unless they were actually executed.

If a dependency, external credential, or approval is missing, explain what is blocked and continue with safe mock implementations where possible.

At the end of each phase, summarize accomplishments, demonstrate the relevant workflows, identify risks, and request approval before proceeding.

---

# PART 21 — DEFINITION OF DONE

A feature is complete only when:

- The implementation works.
- The relevant code is type-safe.
- Inputs are validated.
- Errors are handled.
- Authorization is correct.
- Relevant tests exist.
- Tests pass.
- Documentation is updated.
- No secrets are exposed.
- No unnecessary complexity was introduced.
- The Git commit has been created.

A visually complete UI with fake, non-functional booking behaviour is not considered complete.

An AI assistant that invents prices is not considered complete.

A payment flow that trusts browser callbacks is not considered complete.

A scheduling engine that allows two simultaneous assignments of the same vehicle is not considered complete.

---

# PART 22 — START EXECUTION

Begin by inspecting the current repository.

If the repository is empty, initialize it.

If existing code is present, identify reusable elements and preserve valid implementation rather than overwriting it.

Start with:

**Commit 01 — `chore: initialize nyokolodi transit monorepo`**

Implement the complete monorepo foundation.

Create the required directories, tooling, dependencies, and minimal functional application.

Execute the relevant validation commands.

Fix any failures.

Create the Git commit.

Report the actual commit hash and outcomes.

Continue sequentially through Phase 1, completing Commits 01–04, then stop for review.

Do not skip commits.

Do not pretend to have executed code.

Do not deploy to production without explicit approval.

The long-term objective is a modern, reliable, AI-powered transportation platform that makes Nyokolodi Transit stand out in South Africa while remaining practical and cost-effective for a two-car business.