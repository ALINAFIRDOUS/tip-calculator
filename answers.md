## 1. How to run

Clone the repository and open the project locally:

```bash
git clone <your-repo-url>
cd <project-folder>
```

Since this is a vanilla HTML/CSS/JS project, no dependencies or installation are required.

Run the project by opening:

```bash
index.html
```

in any modern browser (Chrome, Edge, etc.).


---

## 2. Stack & Design Choices

### Why this stack

I chose **vanilla HTML, CSS, and JavaScript** because this is a single-screen, interaction-heavy application without complex state requirements. Using a framework like React would introduce unnecessary abstraction.

This approach allowed me to:

* Keep the logic simple and readable
* Focus on UX and input handling
* Avoid build tools and setup overhead

---

### Design Decision 1 — Real-time updates (no button)

All calculations are triggered on input events instead of using a "Calculate" button.

**Why:**

* Reduces user friction
* Makes the UI feel responsive
* Matches real-world calculator behavior

**Where:**

* Input listeners on bill, tip, and people fields

---

### Design Decision 2 — Fallback logic instead of modifying inputs

Instead of forcing default values into inputs (e.g., setting people = 1), I used fallback logic:

```js
const people = numberofpeople.value === "" ? 1 : parseInt(numberofpeople.value);
```

**Why:**

* Prevents frustrating typing experience
* Keeps user input untouched
* Still ensures safe calculations

---

## 3. Responsive & Accessibility

### Responsive behavior

* **Desktop (1440px):**

  * Two-column layout (inputs + outputs)
  * Clear separation of interaction and results

* **Mobile (~360px):**

  * Stacked layout
  * Tip buttons arranged in grid
  * Outputs remain visible and readable

Handled using media queries.

---

### Accessibility handled

* Proper label-input association using `for` and `id`
* `aria-live="polite"` on output section for screen reader updates
* Visible focus styles for keyboard users

```css
button:focus,
input:focus {
  outline: 2px solid var(--Strong-cyan);
}
```

---

### Accessibility not fully implemented

* Full keyboard navigation testing
* Advanced ARIA roles

**Reason:** Priority was given to core functionality and UX behavior.

---

## 4. AI Usage

I used AI (ChatGPT) for:

* Debugging calculation logic
* Improving validation flow
* Enhancing UX (removing forced defaults)
* Structuring event handling

---

### Example of modifying AI output

AI suggested:

```js
if (numberofpeople.value === "") numberofpeople.value = 1;
```

I changed it to:

```js
const people = numberofpeople.value === "" ? 1 : parseInt(numberofpeople.value);
```

**Why:**

* Avoids interfering with user typing
* Improves UX
* Keeps logic cleaner

---

## 5. Rounding Policy

I used:

```js
value.toFixed(2)
```

This rounds values to the **nearest 2 decimal places**.

### Reason:

* Matches real-world currency formatting
* Predictable and simple

### Tradeoff:

* May cause minor rounding differences when splitting between people

### Alternative (not implemented):

* Always round up to avoid underpayment
* Distribute leftover cents among users

---

## 6. Honest Gap

One area that could be improved:

### Handling extreme inputs

Examples:

* Very large numbers
* Rapid input changes

### Improvements with more time:

* Add input debouncing
* Improve formatting for large values
* Refine validation messages

