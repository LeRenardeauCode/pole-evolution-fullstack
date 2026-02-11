# MUI Deprecation Audit & Refactoring Guidelines

**Date :** 11 février 2026  
**MUI Version :** 7.3.7  
**Status :** Analysis (No code changes applied yet)

---

## Summary

Scan du codebase frontend révèle quelques patterns à corriger ou améliorer pour compatibilité MUI v7 et lisibilité.

**Findings :**
- ✅ Majority of components are correctly using modern MUI props
- ⚠️ Some potential improvements and edge cases identified
- 🔍 Theme key usage is present but could be optimized

---

## Detailed Findings & Recommendations

### 1. **Theme Typography Variant Mapping**

**Issue :** Custom typography variants (`h0`, `titre`) ne sont pas mapés dans `variantMapping` pour `Typography`.

**Location:** `src/utils/theme.js`

**Current State :**
```javascript
typography: {
  h0: { fontSize: "70px", ... },
  titre: { fontSize: "48px", ... },
  // Missing: variantMapping
}
```

**Recommendation :**
```javascript
typography: {
  // ... existing
  h0: { ... },
  titre: { ... },
}
// OR add this OUTSIDE typography object:
components: {
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h0: 'h1',
        titre: 'h2',
      }
    }
  }
}
```

**Why:** Ensures heading hierarchy & SSR-safe HTML structure.

---

### 2. **Dialog Components Props**

**Location:** `src/pages/Tarifs.jsx` (lines ~480-540)

**Observation:**
```jsx
<Dialog
  open={openDialog}
  onClose={handleCloseDialog}
>
  <DialogTitle>...</DialogTitle>
  <DialogContent>...</DialogContent>
  <DialogActions>...</DialogActions>
</Dialog>
```

**Status:** ✅ **GOOD** — Already using correct modern props (`open`, `onClose`).

**Potential improvement (not urgent):**
Add `fullWidth` + `maxWidth="sm"` for responsive dialogs:
```jsx
<Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
```

---

### 3. **Grid Component Props**

**Location:** Multiple pages (`Tarifs.jsx`, `Planning.jsx`, `Cours.jsx`, etc.)

**Current Patterns :**
```jsx
<Grid container spacing={4} justifyContent="center">
  <Grid item xs={12} sm={6} md={4}>...</Grid>
</Grid>
```

**Status :** ✅ **GOOD** — Modern syntax using `justifyContent` (not deprecated `justify`).

**Note:** If any old `justify` prop appears, replace with `justifyContent`.

---

### 4. **Button & TextField Variant Props**

**Location:** `src/pages/Register.jsx`, `Login.jsx`, `MonCompte.jsx`, `Contact.jsx`

**Pattern :**
```jsx
<Button variant="outlined" />
<Button variant="contained" />
<TextField variant="outlined" />
<TextField variant="filled" />
```

**Status :** ✅ **GOOD** — All variants are modern (`outlined`, `contained`, `filled`).

**Note:** Deprecated variant `"flat"` would show as `variant="contained"` now. None detected.

---

### 5. **CircularProgress Color Props**

**Location:** `src/pages/Tarifs.jsx` (line 540)

**Current :**
```jsx
<CircularProgress size={24} color="inherit" />
```

**Status :** ✅ **GOOD** — `color="inherit"` is valid.

---

### 6. **Select & MenuItem Props**

**Location:** `src/components/UI/FilterBar.jsx`

**Pattern :**
```jsx
<FormControl>
  <InputLabel>Type</InputLabel>
  <Select value={...} onChange={...}>
    <MenuItem value="...">...</MenuItem>
  </Select>
</FormControl>
```

**Status :** ✅ **GOOD** — Modern props usage.

**Info:** `labelId` + `id` + `label` recommended for accessibility:
```jsx
<FormControl>
  <InputLabel id="type-label">Type</InputLabel>
  <Select labelId="type-label" id="type-select" value={...}>
    ...
  </Select>
</FormControl>
```

---

### 7. **Box & Container Shorthand Props**

**Overall :** ✅ **GOOD**

Current usage patterns like `sx={{ px: 2, py: 3 }}` are all correct modern syntax.

**No deprecated props detected** (`padding`, `margin` longhand not used in unusual ways).

---

### 8. **AppBar & Toolbar (AdminLayout, Header)**

**Location:** `src/components/layout/Header.jsx`, `src/pages/admin/AdminLayout.jsx`

**Pattern :**
```jsx
<AppBar position="sticky">
  <Toolbar>
    ...
  </Toolbar>
</AppBar>
```

**Status :** ✅ **GOOD** — Correct modern syntax.

---

### 9. **Card & CardContent**

**Location:** Multiple UI components

**Pattern :**
```jsx
<Card>
  <CardContent>
    <Typography>...</Typography>
  </CardContent>
</Card>
```

**Status :** ✅ **GOOD** — No deprecations.

---

## High-Priority Fixes (If Any Warnings Appear)

These are patterns NOT yet detected but **SHOULD BE FIXED immediately if found** :

| Issue | Deprecated | Modern |
|-------|-----------|--------|
| Grid column props | `justify="center"` | `justifyContent="center"` |
| Button color scheme | `color="default"` | `color="inherit"` or omit |
| Select size variance | `size="medium"` (implicit) | Explicit always |
| Table pagination | Old `onChangePage` | `onPageChange` |
| Chip `onDelete` callback | `onDelete(event)` | `onDelete={fn}` returns event |
| Typography `align` | `align="center"` | `sx={{ textAlign: "center" }}` or use style prop |

---

## MUI v7 Specific Notes

**What changed in v7:**
- ✅ `Box`, `Container`, `Grid` — All sx-first, stable.
- ✅ `Typography` — Variants stable; custom variants need explicit `variantMapping`.
- ✅ `Button` — Variants stable; `disableElevation` still supported.
- ✅ `Dialog` — Props stable.
- ✅ `TextField` — All variant modes supported.

**No major breaking changes found in current codebase.**

---

## Recommended Next Steps

### Phase 1: Safe Refactors (Low Risk)
1. ✅ Add `variantMapping` to `theme.js` for custom typography variants
2. ✅ Add `labelId` to `Select` components for a11y (not breaking, improves accessibility)
3. ✅ Add `fullWidth` + `maxWidth` to Dialogs for responsive design

### Phase 2: Optional Ergonomic Improvements
4. Extract large `sx` objects into `const` for reusability
5. Memoize components & useMemo calculations
6. Add accessibility props (`aria-*`, `role`)

### Phase 3: Testing
7. Run lint after changes
8. Smoke test key pages in browser
9. No npm install required — all existing deps are compatible.

---

## Conclusion

**Status:** ✅ **BACKEND-COMPATIBLE**

No critical MUI deprecations found requiring immediate action. The codebase is **well-aligned with MUI v7.3.7**.

**Recommendation:** Focus on the "Phase 1" optional improvements for code quality & accessibility, not to fix "broken" code.

