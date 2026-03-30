---
name: "Component Librarian"
description: "Extract reusable components, enforce Tailwind design tokens, variant APIs using cva(), component documentation, Storybook-style usage examples"
version: "1.0"
triggers:
  - "duplicate components detected"
  - "design system tokens missing"
  - "variant API not implemented"
  - "manual: /build-component-library"
escalates_to: "Design System Lead"
---

## When to Run

- **Duplicate components** detected across codebase (same component written twice)
- **Design token inconsistencies** (color, spacing, typography varies)
- **No variant API** on components (prop combinations hardcoded)
- **No component documentation** (Storybook/Zeroheight)
- **New UI pattern** created that should be component
- **Scheduled monthly** for library expansion audit
- Manual trigger: before major feature additions

## Memory Protocol

**Read First:**
- `CLAUDE.md` (design system, color palette, typography)
- `tailwind.config.ts` (design tokens, theme extensions)
- `src/components/` (existing component structure)
- `/src/components/Button.tsx` (exemplary component with variants)
- `.storybook/` config if exists
- `/docs/COMPONENT_API.md` or design system docs
- `/reports/components/` for previous library audits

**Update After:**
- Create `COMPONENT_LIBRARY_AUDIT_[timestamp].md` with findings
- Extract or refactor identified components
- Update `.storybook/stories/` with new component stories
- Add types: `Button.types.ts` with prop interfaces
- Document in `/docs/COMPONENT_API.md`
- Commit with `components: ` prefix

## Execution Pipeline

### Phase 1: Component Duplication Audit (10 mins)

1. **Find duplicate components**
   ```bash
   find src/components -type f -name "*.tsx" | sort
   grep -r "const Button" src/ --include="*.tsx" | grep -v "export"
   ```
   - Compare similar component implementations
   - Document: which components are duplicates, where defined

2. **Identify candidates for extraction**
   - Components used in 3+ places
   - Custom styling applied in multiple components
   - Logic that could be shared
   - Example: custom button with loading state used in 4 places

3. **Analyze code duplication**
   ```typescript
   // Duplicated pattern 1: in FormField, SelectField, DateField
   const [focused, setFocused] = useState(false);
   return (
     <div className={focused ? "border-cyan-500" : "border-gray-300"}>
       {/* similar pattern repeated */}
     </div>
   );
   
   // Solution: extract to Input wrapper component
   ```
   - Flag: copy-paste code across components

### Phase 2: Design Token Audit (10 mins)

1. **Audit color usage**
   ```bash
   grep -r "bg-\|text-\|border-" src/components --include="*.tsx" | grep -o "#[0-9a-f]\{6\}\|rgb\(\|var(" | sort | uniq -c
   ```
   - Extract all color values used
   - Compare against Tailwind theme colors
   - Flag: hex colors used directly (should use Tailwind)

2. **Check spacing consistency**
   - Document all `p-`, `m-`, `gap-` values used
   - Should align with Tailwind scale: 0, 0.5, 1, 1.5, 2, 3, 4, 6, 8...
   - Flag: custom spacing values (e.g., `px-13`)

3. **Audit typography**
   - Document: font sizes used (`text-sm`, `text-base`, `text-lg`)
   - Check: font weights (`font-normal`, `font-semibold`, `font-bold`)
   - Verify: heading hierarchy uses consistent scales

4. **Update tailwind.config.ts with new tokens**
   ```javascript
   module.exports = {
     theme: {
       extend: {
         colors: {
           'primary': '#00FFFF', // Cyber-industrial cyan
           'accent': '#FF6600',  // Orange accent
           'dark': '#0a0e27',    // Dark background
         },
         spacing: {
           // Use standard Tailwind scale
         },
       },
     },
   };
   ```

### Phase 3: Component Extraction & Structure (12 mins)

1. **Create component folder structure**
   ```
   src/components/
   ├── Button/
   │   ├── Button.tsx
   │   ├── Button.types.ts
   │   ├── Button.test.tsx
   │   ├── Button.stories.tsx
   │   └── index.ts
   ├── Input/
   │   ├── Input.tsx
   │   ├── Input.types.ts
   │   └── ...
   └── index.ts (barrel export)
   ```

2. **Define component prop interfaces**
   ```typescript
   // Button.types.ts
   import { ComponentPropsWithoutRef } from 'react';

   export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
   export type ButtonSize = 'sm' | 'md' | 'lg';

   export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
     variant?: ButtonVariant;
     size?: ButtonSize;
     isLoading?: boolean;
     iconLeft?: React.ReactNode;
     iconRight?: React.ReactNode;
   }
   ```

3. **Implement variant API with cva()**
   ```typescript
   import { cva, type VariantProps } from 'class-variance-authority';

   const buttonVariants = cva(
     // Base classes
     'inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50',
     {
       variants: {
         variant: {
           primary: 'bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700',
           secondary: 'bg-gray-700 text-white hover:bg-gray-800',
           outline: 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white',
           ghost: 'text-gray-300 hover:text-white hover:bg-gray-700',
         },
         size: {
           sm: 'px-3 py-1.5 text-sm',
           md: 'px-4 py-2 text-base',
           lg: 'px-6 py-3 text-lg',
         },
       },
       defaultVariants: {
         variant: 'primary',
         size: 'md',
       },
     }
   );

   export const Button = ({ variant, size, ...props }: ButtonProps) => (
     <button className={buttonVariants({ variant, size })} {...props} />
   );
   ```

4. **Create barrel export**
   ```typescript
   // src/components/index.ts
   export { Button } from './Button';
   export type { ButtonProps } from './Button/Button.types';
   export { Input } from './Input';
   export { Card } from './Card';
   // ... all components
   ```

### Phase 4: Component Documentation (10 mins)

1. **Create Storybook stories**
   ```typescript
   // Button.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { Button } from './Button';

   const meta: Meta<typeof Button> = {
     title: 'Components/Button',
     component: Button,
     parameters: {
       layout: 'centered',
     },
   };

   export const Primary: StoryObj<typeof Button> = {
     args: {
       variant: 'primary',
       size: 'md',
       children: 'Click me',
     },
   };

   export const Secondary: StoryObj<typeof Button> = {
     args: {
       variant: 'secondary',
       size: 'md',
       children: 'Secondary Action',
     },
   };

   export const Loading: StoryObj<typeof Button> = {
     args: {
       variant: 'primary',
       isLoading: true,
       children: 'Loading...',
     },
   };

   export default meta;
   ```

2. **Document component API**
   ```markdown
   # Button Component

   Primary interactive element for user actions.

   ## Variants
   - **primary**: Cyan background, main CTA
   - **secondary**: Gray background, secondary action
   - **outline**: Cyan border, minimal style
   - **ghost**: Text only, lowest emphasis

   ## Sizes
   - **sm**: 32px height, text-sm
   - **md**: 40px height, text-base (default)
   - **lg**: 48px height, text-lg

   ## Props
   - `variant`: ButtonVariant = 'primary'
   - `size`: ButtonSize = 'md'
   - `isLoading`: boolean = false
   - `iconLeft`: ReactNode (icon before text)
   - `iconRight`: ReactNode (icon after text)
   - All standard button HTML props

   ## Usage
   \`\`\`tsx
   <Button variant="primary" size="lg" onClick={handleClick}>
     Submit
   </Button>
   \`\`\`
   ```

3. **Create usage examples**
   - Basic: `<Button>Click me</Button>`
   - With variant: `<Button variant="outline">Secondary</Button>`
   - With icon: `<Button iconLeft={<Icon />}>Action</Button>`
   - Loading state: `<Button isLoading>Processing...</Button>`
   - Disabled: `<Button disabled>Unavailable</Button>`

### Phase 5: Component Testing & Accessibility (10 mins)

1. **Write component tests**
   ```typescript
   import { render, screen } from '@testing-library/react';
   import userEvent from '@testing-library/user-event';
   import { Button } from './Button';

   describe('Button', () => {
     it('renders with text', () => {
       render(<Button>Click me</Button>);
       expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
     });

     it('calls onClick handler', async () => {
       const handleClick = vi.fn();
       render(<Button onClick={handleClick}>Click</Button>);
       await userEvent.click(screen.getByRole('button'));
       expect(handleClick).toHaveBeenCalled();
     });

     it('shows loading state', () => {
       render(<Button isLoading>Loading</Button>);
       expect(screen.getByRole('button')).toBeDisabled();
     });

     it('respects disabled prop', () => {
       render(<Button disabled>Disabled</Button>);
       expect(screen.getByRole('button')).toBeDisabled();
     });
   });
   ```

2. **Check accessibility**
   - Button has descriptive text or aria-label
   - Focus indicator visible
   - Keyboard accessible (Enter, Space)
   - ARIA attributes correct (aria-disabled, aria-pressed, etc.)
   - Color contrast: 4.5:1 minimum

### Phase 6: Library Organization (8 mins)

1. **Organize components by feature**
   ```
   src/components/
   ├── primitives/      # Basic components: Button, Input, Card
   ├── forms/           # Form components: Form, FormField, Select
   ├── layout/          # Layout: Header, Footer, Sidebar
   ├── navigation/      # Navigation: Nav, Breadcrumb, Tabs
   └── sections/        # Feature sections: Hero, CTA, etc.
   ```

2. **Create component registry**
   - Document: all available components, variants, props
   - Generate from TypeScript interfaces (optional)
   - Publish to internal documentation

3. **Set up component versioning**
   - Semantic versioning for component changes
   - Breaking changes documented
   - Migration guides for deprecated variants

### Phase 7: Design System Integration (8 mins)

1. **Export from design system package**
   ```typescript
   // src/index.ts (or src/components/index.ts)
   export { Button, type ButtonProps } from './Button';
   export { Input, type InputProps } from './Input';
   // ...all components with types
   ```

2. **Create usage guidelines**
   - When to use each variant
   - Spacing between components
   - Accessibility checklist
   - Performance considerations

3. **Set up component library versioning**
   - If published to npm: version components
   - Internal monorepo: shared component folder
   - Version lock for design consistency

## Output Section

**Deliverables:**
1. **Component Library Audit** (`COMPONENT_LIBRARY_AUDIT_[timestamp].md`)
   - Duplicate components found and locations
   - Design token inconsistencies
   - Extracted components list
   - Variants defined per component
   - Testing status
   - Accessibility audit results
   - Documentation coverage

2. **Extracted Components**
   - New component implementations with variant API (cva())
   - Component types interfaces
   - Storybook stories for each component
   - Unit tests with >80% coverage
   - Component.types.ts files

3. **Documentation**
   - Updated `/docs/COMPONENT_API.md`
   - Storybook stories running
   - Design token documentation
   - Migration guide for old components

**Success Criteria:**
- Zero duplicate components
- All design tokens defined in Tailwind theme
- All components have variant API (cva())
- Storybook stories for all components
- Components >80% test coverage
- Accessibility: WCAG 2.1 AA compliant
- TypeScript: fully typed props

## Escalation Rules

**Escalate if:**
- Design system needs brand refresh
- Component architecture requires restructure
- Performance issues with component rendering
- Design token system needs redesign
- TypeScript types require strict typing overhaul

**Auto-escalate if:**
- >20 duplicate components found
- Design token inconsistencies >30% of codebase
- Components missing accessibility attributes
- Component tests cannot reach 80% coverage
