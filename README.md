# Municipal Services Portal

A React-based municipal services portal providing digital access to government services and citizen requests.

## Components & Routes

### Authentication Components

- **Login** (`/login`) - Standard user authentication page
- **National Login** (`/national-login`) - Government employee authentication

### User Management Components

- **Authority Selection** (`/municipal-selection`) - Municipality/authority selection
- **Select User Type** (`/select-user-type`) - User role selection interface

### Main Navigation

- **Main Menu** (`/main-menu`) - Central navigation hub with categorized service access
  - Personal Area: User account management and property details
  - Quick Actions: Engineering services, certificates, planning info
  - Payments: Payment processing and debt management
  - Certificates: Document requests and form submissions

### Service Components

- **Arnona Request** (`/arnona-request`) - Property tax request submission
- **Land Registry Request** (`/request-for-land-registry`) - Land-related applications
- **Open Request Change Payers** (`/open-request-change-payers`) - Payment request management

### Information & Education Components

- **Education** (`/education`) - Educational services and resources
- **Engineering** (`/engineering`) - Technical services and building permits
- **Classes** (`/classes`) - Course catalog and enrollment
- **Events Info Cards** (`/events-info-cards`) - Municipal events and announcements

### GenericBox Component

GenericBox is a reusable interactive component that displays service options with dynamic visual states. It features hover effects, active state indicators with checkmarks, and automatically switches between default, hover, and active icon variants based on user interaction and component state.

### CustomTypography Component

CustomTypography provides a comprehensive text styling system with predefined typography scales for desktop and mobile, including headings (H1-H6), body text variants, and button text styles. It supports ellipsis truncation with tooltips, responsive design, and consistent font family (Rubik) across all text elements.

## Technical Structure

- **Routing**: React Router with protected and public route separation
- **Components**: Modular page components in `/src/pages/` with reusable UI components in `/src/components/`
- **Navigation**: Centralized routing configuration in `/src/routes/routes.tsx`
- **State Management**: Redux store for application state
- **Styling**: Tailwind CSS with custom theme configuration and component-specific styling
- **Internationalization**: i18next for multi-language support
- **Icons**: Centralized icon management with state-based variants (default, hover, active)

## Development

The application follows a component-based architecture where each route corresponds to a specific page component handling municipal service functionality. All routes are configured through the centralized routing system with proper authentication guards and breadcrumb navigation. The inner components provide consistent UI patterns and reusable functionality across different pages.
