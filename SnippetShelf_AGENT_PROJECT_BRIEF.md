# SnippetShelf — Claude Code / Antigravity Agent Project Brief

> Bu dosya Claude Code veya Google Antigravity içine verilecek ana proje talimatıdır.  
> Amaç: Sıfırdan başlanacak, agent kullanımıyla geliştirilecek, GitHub’da paylaşılabilecek basit ama düzgün görünen bir frontend projesi yapmak.

---

## 1. Proje Fikri

**Proje Adı:** SnippetShelf  
**Alt Başlık:** Personal Code Snippet Manager  
**Proje Türü:** Frontend web uygulaması  
**Zorluk:** Başlangıç - orta seviye  
**Hedef:** Kullanıcının faydalı kod parçacıklarını kaydedebildiği, etiketleyebildiği, arayabildiği, filtreleyebildiği ve hızlıca kopyalayabildiği kişisel bir code snippet yöneticisi yapmak.

Bu proje özellikle Claude Code / Antigravity denemesi için uygundur çünkü:

- Backend gerektirmez.
- Yazılım öğrencisi için mantıklı ve GitHub’da iyi görünen bir projedir.
- React component yapısına çok uygundur.
- Search, filter, favorite, copy, import/export gibi gerçek uygulama özellikleri içerir.
- LocalStorage ile veri kalıcılığı kolayca yapılabilir.
- Test yazmaya uygundur.
- Agent’lara rahat bölünebilir.
- Antigravity Browser ile kullanıcı akışı kolay test edilir.

---

## 2. Kullanılacak Teknolojiler

Ana teknoloji:

```bash
React + TypeScript + Vite + CSS
```

Test araçları:

```bash
Vitest
React Testing Library
@testing-library/jest-dom
```

Ek notlar:

- Backend yok.
- Database yok.
- Authentication yok.
- İlk sürümde syntax highlighting kütüphanesi zorunlu değil.
- Kod parçaları basit `<pre><code>` bloklarıyla gösterilebilir.
- Veriler `localStorage` içinde tutulacak.
- İlk örnek snippet kayıtları `src/data/sampleSnippets.ts` içinde olacak.
- UI sade, modern, responsive ve okunabilir olacak.
- Gereksiz büyük kütüphane eklenmeyecek.

---

## 3. Ana Özellikler

### 3.1 Snippet Ekleme

Kullanıcı yeni kod parçacığı ekleyebilmeli.

Her snippet kaydında şu alanlar olacak:

- Title
- Description
- Programming language
- Code content
- Tags
- Favorite status
- Created date
- Updated date

Desteklenecek örnek diller:

```txt
JavaScript
TypeScript
Python
Java
C
C++
SQL
HTML
CSS
Other
```

Örnek kayıt:

```txt
Title: Debounce Function
Language: JavaScript
Description: Delays function execution until user stops triggering it.
Tags: javascript, utility, performance
Favorite: false
```

---

### 3.2 Snippet Listeleme

Snippet kayıtları kartlar halinde listelenmeli.

Kart üzerinde şunlar görünmeli:

- Snippet title
- Language badge
- Description
- Tags
- Created date
- Favorite button
- Copy code button
- Detail button
- Edit button
- Delete button

---

### 3.3 Search

Kullanıcı snippet kayıtları içinde arama yapabilmeli.

Arama şu alanlarda çalışmalı:

- Title
- Description
- Language
- Code content
- Tags

Arama case-insensitive olmalı.

---

### 3.4 Filter

Kullanıcı snippet kayıtlarını filtreleyebilmeli.

Filtre seçenekleri:

- Programming language
- Favorite snippets
- Tag

Örnek:

```txt
Language: TypeScript
Tag: react
Only Favorites: true
```

---

### 3.5 Sort

Kullanıcı snippet kayıtlarını sıralayabilmeli.

Sıralama seçenekleri:

- Newest first
- Oldest first
- Title A-Z
- Language A-Z
- Recently updated

---

### 3.6 Snippet Detail Modal

Kullanıcı bir snippet kartındaki detay butonuna tıklayınca modal açılmalı.

Modal içinde:

- Title
- Full description
- Language
- Full code block
- Tags
- Created date
- Updated date
- Copy code button
- Favorite toggle
- Close button

Kurallar:

- ESC ile kapanabilmeli.
- Overlay tıklanınca kapanabilmeli.
- Mobile’da taşma yapmamalı.
- Kod bloğu yatay scroll desteklemeli.

---

### 3.7 Snippet Editleme

Kullanıcı var olan snippet kaydını düzenleyebilmeli.

Düzenlenebilir alanlar:

- Title
- Description
- Language
- Code content
- Tags

Kurallar:

- Edit sonrası `updatedAt` alanı güncellenmeli.
- Boş title kabul edilmemeli.
- Boş code content kabul edilmemeli.

---

### 3.8 Kodu Kopyalama

Kullanıcı snippet içindeki kodu tek butonla panoya kopyalayabilmeli.

Kurallar:

- Copy button kartta ve modalda bulunmalı.
- Başarılı kopyalama sonrası kısa feedback verilmeli.
- Clipboard API hata verirse kullanıcıya anlaşılır mesaj gösterilmeli.

---

### 3.9 Favorite Özelliği

Kullanıcı sık kullandığı snippetleri favoriye ekleyebilmeli.

Kurallar:

- Favori durumu localStorage içinde saklanmalı.
- Sayfa yenilenince favoriler kaybolmamalı.
- Favorite filter ile sadece favoriler gösterilebilmeli.

---

### 3.10 Dashboard

Ana ekranda kısa özet paneli olmalı.

Gösterilecek değerler:

- Total snippets
- Favorite snippets
- Total languages used
- Most used language
- Most used tag

---

### 3.11 Empty State

Arama veya filtre sonucu kayıt bulunamazsa kullanıcıya boş durum gösterilmeli.

Örnek:

```txt
No snippets found.
Try changing your search or filters, or add a new snippet.
```

---

### 3.12 LocalStorage

Sayfa yenilendiğinde snippet kayıtları kaybolmamalı.

Saklanacak veriler:

- Snippet listesi
- Filter preferences
- Sort option

Storage key:

```txt
snippetshelf-data-v1
```

---

### 3.13 Export / Import

Kullanıcı snippet kayıtlarını JSON olarak dışa aktarabilmeli ve tekrar içe aktarabilmeli.

Export:

- Tüm snippet listesi
- Filter/sort preference

Import:

- Geçerli JSON ise veriyi yükle
- Geçersiz JSON ise hata göster
- Eksik alan varsa güvenli fallback kullan
- Uygulama çökmemeli

---

### 3.14 Responsive Tasarım

Uygulama şu ekranlarda düzgün çalışmalı:

- Desktop
- Tablet
- Mobile

Minimum hedef:

- Desktop’ta dashboard üstte, snippet listesi grid yapıda görünmeli.
- Mobile’da kartlar tek sütun olmalı.
- Filtre alanları alt alta dizilmeli.
- Modal mobile’da tam genişliğe yakın açılmalı.
- Kod blokları küçük ekranda yatay scroll ile okunabilmeli.
- Yatay taşma olmamalı.

---

## 4. Hedef Kullanıcı

```txt
Yazılım mühendisliği öğrencisi.
Sık kullandığı kod parçalarını tek yerde saklamak istiyor.
GitHub’da paylaşılabilecek küçük ama gerçekçi bir proje geliştirmek istiyor.
```

---

## 5. İlk Sürüm Kapsamı

### Yapılacaklar

- React + TypeScript + Vite kurulumu
- Component tabanlı yapı
- Snippet ekleme formu
- Snippet kartları
- Search
- Filter
- Sort
- Detail modal
- Editleme
- Delete
- Copy to clipboard
- Favorite
- Dashboard
- LocalStorage
- Export/import
- Basit testler
- README
- GitHub hazırlığı

### Yapılmayacaklar

- Login/register
- Backend API
- Database
- Cloud sync
- Gerçek kullanıcı hesabı
- Gerçek syntax highlighting zorunluluğu
- Kod çalıştırma özelliği
- AI kod üretme özelliği
- Payment
- Online collaboration

---

## 6. Beklenen Dosya Yapısı

```txt
snippetshelf/
├── .claude/
│   └── agents/
│       ├── product-planner.md
│       ├── data-modeler.md
│       ├── frontend-architect.md
│       ├── feature-builder.md
│       ├── clipboard-agent.md
│       ├── ui-designer.md
│       ├── storage-agent.md
│       ├── qa-tester.md
│       └── docs-github-agent.md
├── public/
├── src/
│   ├── components/
│   │   ├── SnippetForm.tsx
│   │   ├── SnippetCard.tsx
│   │   ├── SnippetList.tsx
│   │   ├── SnippetDetailModal.tsx
│   │   ├── Dashboard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── SortSelect.tsx
│   │   ├── EmptyState.tsx
│   │   └── ImportExportPanel.tsx
│   ├── data/
│   │   └── sampleSnippets.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useSnippetFilters.ts
│   │   └── useClipboard.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── snippetFilters.ts
│   │   ├── snippetStats.ts
│   │   ├── storage.ts
│   │   └── date.ts
│   ├── tests/
│   │   ├── snippetFilters.test.ts
│   │   ├── snippetStats.test.ts
│   │   └── storage.test.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── setupTests.ts
├── docs/
│   └── requirements.md
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── PROJECT_BRIEF.md
```

---

## 7. Claude Code Ana Prompt’u

Claude Code’a verilecek ana prompt:

```txt
You are building a beginner-friendly React + TypeScript project called "SnippetShelf".

Read PROJECT_BRIEF.md completely before editing code.

Use the custom subagents inside .claude/agents when appropriate.

Project goals:
1. Build a Vite + React + TypeScript app.
2. Create a personal code snippet manager with sample snippet data.
3. Allow users to create, view, search, filter, sort, edit, delete, favorite, and copy snippets.
4. Add snippet detail modal.
5. Add dashboard statistics.
6. Persist data with localStorage.
7. Add JSON export/import.
8. Add basic tests.
9. Prepare the project for GitHub with a clean README.

Important rules:
- Work only inside this project folder.
- Do not delete files outside the workspace.
- Do not use destructive terminal commands.
- Ask for review before major file deletion or dependency changes.
- Keep the app simple and understandable.
- Prefer small commits or clear checkpoints.
- After each major phase, run build or tests and summarize what changed.
```

---

## 8. Agent Tanımları

Aşağıdaki agent dosyaları `.claude/agents/` klasörüne oluşturulmalıdır.

---

### 8.1 `product-planner.md`

```md
---
name: product-planner
description: Use this agent to clarify requirements, write user stories, define acceptance criteria, and protect project scope.
tools: Read, Write, Edit
---

You are the Product Planner Agent for the SnippetShelf project.

Responsibilities:
- Read PROJECT_BRIEF.md.
- Convert the project idea into clear user stories.
- Define acceptance criteria for each feature.
- Keep the project beginner-friendly.
- Prevent scope creep.
- Make sure no backend, auth, cloud sync, code execution, or AI code generation feature is added.
- Create or update docs/requirements.md.

Output format:
1. Feature summary
2. User stories
3. Acceptance criteria
4. Out-of-scope items
5. Risks or unclear points

Do not implement UI code unless explicitly requested.
```

---

### 8.2 `data-modeler.md`

```md
---
name: data-modeler
description: Use this agent to design TypeScript models, sample snippet data, validation rules, and controlled language values.
tools: Read, Write, Edit
---

You are the Data Modeler Agent.

Responsibilities:
- Define TypeScript types for snippet records.
- Create src/data/sampleSnippets.ts.
- Add at least 10 realistic sample snippet records.
- Keep sample data safe and non-sensitive.
- Make language values consistent.
- Make tags useful for search/filter testing.

Required fields:
- id
- title
- description
- language
- code
- tags
- isFavorite
- createdAt
- updatedAt

Output:
- Type definitions
- Sample snippet data
- Short notes about assumptions
```

---

### 8.3 `frontend-architect.md`

```md
---
name: frontend-architect
description: Use this agent to design React component structure, TypeScript types, state flow, hooks, and project architecture.
tools: Read, Write, Edit, Bash
---

You are the Frontend Architect Agent.

Responsibilities:
- Create a clean React + TypeScript structure.
- Create reusable types in src/types/index.ts.
- Decide component responsibilities.
- Decide state flow.
- Create hooks and utility placeholders.
- Keep search/filter/sort logic testable through pure functions.
- Avoid overengineering.
- Make sure the project builds with Vite.

Output:
1. Folder structure
2. Component responsibility list
3. TypeScript interfaces
4. State flow notes
5. Architecture notes

You may edit files when implementing structure.
Run build when relevant.
```

---

### 8.4 `feature-builder.md`

```md
---
name: feature-builder
description: Use this agent to implement snippet manager features such as create, list, search, filter, sort, edit, delete, favorite, detail modal, and dashboard wiring.
tools: Read, Write, Edit, Bash
---

You are the Feature Builder Agent.

Responsibilities:
- Implement snippet creation.
- Implement snippet listing.
- Implement search.
- Implement filters.
- Implement sorting.
- Implement detail modal.
- Implement edit.
- Implement delete.
- Implement favorite toggle.
- Wire dashboard to real state.
- Keep code readable and beginner-friendly.
- Avoid unnecessary dependencies.

Feature rules:
- A snippet must have id, title, description, language, code, tags, isFavorite, createdAt, updatedAt.
- Search must be case-insensitive.
- Editing a snippet must update updatedAt.
- Deleting a snippet removes it from app state and persisted storage.
- Empty state must appear when no results match.

After implementation:
- Run npm run build.
- Fix TypeScript errors.
- Summarize changed files.
```

---

### 8.5 `clipboard-agent.md`

```md
---
name: clipboard-agent
description: Use this agent to implement copy-to-clipboard behavior, clipboard fallback handling, and user feedback messages.
tools: Read, Write, Edit, Bash
---

You are the Clipboard Agent.

Responsibilities:
- Implement a useClipboard hook.
- Add copy buttons to SnippetCard and SnippetDetailModal.
- Use navigator.clipboard.writeText when available.
- Show short success feedback after copying.
- Show a friendly error if copy fails.
- Keep behavior simple and accessible.

Rules:
- Do not execute user code.
- Do not send code anywhere.
- Copy only the selected snippet code text.
- Avoid unnecessary dependencies.

After implementation:
- Run npm run build.
- Summarize changed files.
```

---

### 8.6 `ui-designer.md`

```md
---
name: ui-designer
description: Use this agent to create clean responsive CSS, layout, cards, badges, modal design, code blocks, empty states, and beginner-friendly visual polish.
tools: Read, Write, Edit, Bash
---

You are the UI Designer Agent.

Responsibilities:
- Create a clean and modern snippet manager interface.
- Use plain CSS in src/index.css.
- Add dashboard cards.
- Add snippet cards.
- Add language badges.
- Add responsive layout.
- Add empty state styling.
- Add modal styling.
- Make code blocks readable.
- Keep colors readable and not excessive.
- Make the UI work on mobile and desktop.

Visual style:
- Lightweight developer tool
- Clean dashboard
- Rounded cards
- Soft shadows
- Good spacing
- Clear contrast
- Readable monospace code blocks
- No heavy animations

You may edit JSX and CSS.
After changes, run build if possible.
```

---

### 8.7 `storage-agent.md`

```md
---
name: storage-agent
description: Use this agent to implement localStorage persistence, import/export JSON, data validation, and storage utilities.
tools: Read, Write, Edit, Bash
---

You are the Storage Agent.

Responsibilities:
- Implement localStorage helpers.
- Make sure snippet records survive refresh.
- Save filter and sort preferences if implemented.
- Add JSON export.
- Add JSON import.
- Validate imported JSON before replacing current data.
- Avoid crashing the app on invalid localStorage data.
- Add tests for storage helpers.

Rules:
- Use stable key: snippetshelf-data-v1.
- If localStorage parsing fails, return safe default data.
- Export should produce valid JSON.
- Import should reject invalid JSON with a friendly error.
- Do not store sensitive data.

After implementation:
- Add or update tests for storage functions.
- Run tests.
```

---

### 8.8 `qa-tester.md`

```md
---
name: qa-tester
description: Use this agent to write tests, run build/test commands, inspect likely bugs, and produce a QA checklist.
tools: Read, Write, Edit, Bash
---

You are the QA Tester Agent.

Responsibilities:
- Add tests for pure utility functions.
- Test search/filter/sort behavior.
- Test dashboard stats calculation.
- Test storage fallback.
- Check TypeScript build.
- Check for common UI bugs.
- Verify main user flow manually.

Minimum tests:
- search by title
- search by tag
- search by code content
- filter by language
- filter favorites
- sort by newest
- sort by title A-Z
- count total snippets
- count favorite snippets
- find most used language
- invalid localStorage fallback
- valid import data check

Commands:
- npm run build
- npm test

Output:
1. What was tested
2. Passing/failing status
3. Bugs found
4. Bugs fixed
5. Remaining manual checks
```

---

### 8.9 `docs-github-agent.md`

```md
---
name: docs-github-agent
description: Use this agent to prepare README, GitHub project description, screenshots checklist, commit messages, and repository publishing steps.
tools: Read, Write, Edit, Bash
---

You are the Docs and GitHub Agent.

Responsibilities:
- Create a professional README.md.
- Explain project features clearly.
- Add installation steps.
- Add usage instructions.
- Add screenshots section placeholder.
- Add tech stack.
- Add future improvements.
- Add license recommendation.
- Prepare GitHub publishing checklist.

README must include:
- Project title
- Short description
- Features
- Tech stack
- Getting started
- Usage
- Project structure
- Screenshots placeholder
- Future improvements
- Author
- License

Keep it suitable for a beginner GitHub portfolio.
```

---

## 9. Proje Aşamaları

Claude Code veya Antigravity bu sırayı takip etmeli.

---

### Phase 0 — Güvenli Başlangıç

Amaç: Proje klasörünü ve temel Vite kurulumunu oluşturmak.

```bash
mkdir snippetshelf
cd snippetshelf
git init
npm create vite@latest . -- --template react-ts
npm install
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm run build
git add .
git commit -m "chore: initialize react vite project"
```

Kabul kriteri:

- Proje klasörü oluşmuş olmalı.
- Vite React TypeScript kurulmuş olmalı.
- `npm run build` hata vermemeli.
- İlk commit atılmış olmalı.

---

### Phase 1 — Requirements

Kullanılacak agent:

```txt
product-planner
```

Yapılacaklar:

1. PROJECT_BRIEF.md oku.
2. User story listesi oluştur.
3. Acceptance criteria yaz.
4. Scope dışı özellikleri listele.
5. `docs/requirements.md` dosyasını oluştur.

Örnek user story:

```txt
As a student developer, I want to save code snippets so that I can reuse useful code later.
As a student developer, I want to search snippets so that I can quickly find what I need.
As a student developer, I want to copy snippet code so that I can paste it into my project.
```

Commit:

```bash
git add .
git commit -m "docs: define snippet manager requirements"
```

---

### Phase 2 — Data Model ve Sample Data

Kullanılacak agent:

```txt
data-modeler
```

Yapılacaklar:

1. `src/types/index.ts` oluştur.
2. Snippet type ve language değerlerini yaz.
3. `src/data/sampleSnippets.ts` oluştur.
4. En az 10 sample snippet ekle.

Örnek type:

```ts
export type SnippetLanguage =
  | "JavaScript"
  | "TypeScript"
  | "Python"
  | "Java"
  | "C"
  | "C++"
  | "SQL"
  | "HTML"
  | "CSS"
  | "Other";

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: SnippetLanguage;
  code: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SnippetShelfData {
  snippets: CodeSnippet[];
  preferences: SnippetPreferences;
}

export interface SnippetPreferences {
  searchQuery: string;
  selectedLanguage: SnippetLanguage | "All";
  selectedTag: string | "All";
  onlyFavorites: boolean;
  sortOption: SnippetSortOption;
}

export type SnippetSortOption =
  | "newest"
  | "oldest"
  | "title-asc"
  | "language-asc"
  | "updated-desc";
```

Commit:

```bash
git add .
git commit -m "chore: add snippet data model and sample records"
```

---

### Phase 3 — Architecture

Kullanılacak agent:

```txt
frontend-architect
```

Yapılacaklar:

1. Component klasörlerini oluştur.
2. Hook ve utility dosyalarını oluştur.
3. State flow planla.
4. Component sorumluluklarını yaz.
5. Boş component iskeletlerini oluştur.

Kabul kriteri:

- Dosya yapısı düzenli olmalı.
- TypeScript path ve importlar düzgün olmalı.
- Utility fonksiyonları test edilebilir olmalı.

Commit:

```bash
git add .
git commit -m "chore: add frontend architecture"
```

---

### Phase 4 — Snippet Listeleme

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. `SnippetCard.tsx` oluştur.
2. `SnippetList.tsx` oluştur.
3. `EmptyState.tsx` oluştur.
4. Sample snippet verilerini App’e bağla.
5. Kartlarda temel bilgileri göster.
6. Code preview alanı ekle.

Kabul kriteri:

- Sample snippet kayıtları görünmeli.
- Kartlar okunaklı olmalı.
- Language badge görünmeli.
- Code preview okunabilir olmalı.
- Empty state component hazır olmalı.

Commit:

```bash
git add .
git commit -m "feat: add snippet listing"
```

---

### Phase 5 — Snippet Ekleme Formu

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. `SnippetForm.tsx` oluştur.
2. Form alanlarını ekle.
3. Validation ekle.
4. Yeni snippet kaydını state’e ekle.
5. Form submit sonrası form temizlensin.

Validation:

- Title boş olamaz.
- Code content boş olamaz.
- Language seçilmeli.
- Tags virgül ile ayrılabilir.

Kabul kriteri:

- Kullanıcı yeni snippet ekleyebilmeli.
- Yeni snippet listede görünmeli.
- Boş title ile kayıt eklenmemeli.
- Boş code ile kayıt eklenmemeli.
- CreatedAt ve updatedAt otomatik oluşturulmalı.

Commit:

```bash
git add .
git commit -m "feat: add snippet creation form"
```

---

### Phase 6 — Search, Filter ve Sort

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. `SearchBar.tsx` oluştur.
2. `FilterPanel.tsx` oluştur.
3. `SortSelect.tsx` oluştur.
4. `src/utils/snippetFilters.ts` içine pure functions yaz.
5. `useSnippetFilters.ts` hook oluştur.
6. UI kontrollerini gerçek state’e bağla.

Kabul kriteri:

- Search çalışmalı.
- Language filter çalışmalı.
- Tag filter çalışmalı.
- Favorite filter çalışmalı.
- Sort seçenekleri doğru çalışmalı.
- Sonuç yoksa empty state görünmeli.

Commit:

```bash
git add .
git commit -m "feat: add snippet search filters and sorting"
```

---

### Phase 7 — Favorite, Edit ve Delete

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. Favorite toggle fonksiyonu ekle.
2. Edit mode veya edit modal ekle.
3. Edit sonrası updatedAt güncellensin.
4. Delete fonksiyonu ekle.
5. Kart butonlarını gerçek state’e bağla.

Kabul kriteri:

- Favorite açılıp kapanabilmeli.
- Snippet düzenlenebilmeli.
- UpdatedAt değişmeli.
- Snippet silinebilmeli.
- Silinen snippet listeden kaybolmalı.

Commit:

```bash
git add .
git commit -m "feat: add snippet favorite edit and delete"
```

---

### Phase 8 — Detail Modal

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. `SnippetDetailModal.tsx` oluştur.
2. Karttaki detail butonu modal açmalı.
3. Modal tüm snippet detaylarını göstermeli.
4. Modal içinde favorite toggle çalışmalı.
5. Modal içinde copy button için alan hazırlanmalı.
6. ESC ile kapanmalı.
7. Overlay tıklamasıyla kapanmalı.

Kabul kriteri:

- Doğru snippet detayı açılmalı.
- Modal kapanabilmeli.
- Modal mobile’da taşmamalı.
- Kod bloğu okunabilir olmalı.
- Modal içindeki state kartla senkron olmalı.

Commit:

```bash
git add .
git commit -m "feat: add snippet detail modal"
```

---

### Phase 9 — Clipboard Copy

Kullanılacak agent:

```txt
clipboard-agent
```

Yapılacaklar:

1. `useClipboard.ts` hook oluştur.
2. Kartta copy button çalışsın.
3. Modalda copy button çalışsın.
4. Başarı mesajı göster.
5. Hata mesajı göster.

Kabul kriteri:

- Kullanıcı kodu panoya kopyalayabilmeli.
- Başarılı kopyalama anlaşılır olmalı.
- Clipboard hata verirse uygulama çökmemeli.
- Kod hiçbir şekilde çalıştırılmamalı, sadece kopyalanmalı.

Commit:

```bash
git add .
git commit -m "feat: add copy to clipboard"
```

---

### Phase 10 — Dashboard

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. `Dashboard.tsx` oluştur.
2. `src/utils/snippetStats.ts` içine pure stats functions yaz.
3. Dashboard kartlarını oluştur.
4. State ile dashboard’u bağla.

Gösterilecek değerler:

- Total Snippets
- Favorite Snippets
- Languages Used
- Most Used Language
- Most Used Tag

Kabul kriteri:

- Değerler gerçek snippet verisinden hesaplanmalı.
- Boş liste durumunda bozulmamalı.
- Stats fonksiyonları test edilebilir olmalı.

Commit:

```bash
git add .
git commit -m "feat: add snippet dashboard"
```

---

### Phase 11 — LocalStorage

Kullanılacak agent:

```txt
storage-agent
```

Yapılacaklar:

1. `useLocalStorage.ts` oluştur.
2. `src/utils/storage.ts` oluştur.
3. App state’i localStorage ile bağla.
4. Bozuk storage verisi için fallback ekle.
5. Sayfa yenilenince data kalsın.

Kabul kriteri:

- Snippet kayıtları refresh sonrası kaybolmamalı.
- Filter/sort tercihleri kaybolmamalı.
- Invalid JSON app’i çökertmemeli.

Commit:

```bash
git add .
git commit -m "feat: persist snippet data with localStorage"
```

---

### Phase 12 — Export / Import

Kullanılacak agent:

```txt
storage-agent
```

Yapılacaklar:

1. `ImportExportPanel.tsx` oluştur.
2. Export JSON butonu ekle.
3. Import textarea veya file input ekle.
4. JSON validation yaz.
5. Başarılı/hatalı mesaj göster.

Kabul kriteri:

- Export geçerli JSON üretmeli.
- Import geçerli JSON ile çalışmalı.
- Hatalı JSON app’i çökertmemeli.
- Kullanıcı hata mesajını görmeli.

Commit:

```bash
git add .
git commit -m "feat: add snippet data import and export"
```

---

### Phase 13 — UI Polish

Kullanılacak agent:

```txt
ui-designer
```

Yapılacaklar:

1. `src/index.css` düzenle.
2. Responsive layout ekle.
3. Dashboard card tasarımı ekle.
4. Snippet card tasarımı ekle.
5. Language badge stilleri ekle.
6. Code block stilleri ekle.
7. Modal tasarımını düzelt.
8. Mobile görünümü iyileştir.

Kabul kriteri:

- UI temiz görünmeli.
- Mobile’da yatay taşma olmamalı.
- Code block okunabilir olmalı.
- Form ve filtre alanları kullanışlı olmalı.

Commit:

```bash
git add .
git commit -m "style: polish snippet manager interface"
```

---

### Phase 14 — Testler

Kullanılacak agent:

```txt
qa-tester
```

Yapılacaklar:

1. Vitest config kontrol et.
2. `setupTests.ts` oluştur.
3. Filter testleri yaz.
4. Stats testleri yaz.
5. Storage testleri yaz.
6. Build ve test çalıştır.

Minimum testler:

- Title search doğru çalışıyor.
- Tag search doğru çalışıyor.
- Code content search doğru çalışıyor.
- Language filter doğru çalışıyor.
- Favorite filter doğru çalışıyor.
- Newest sort doğru çalışıyor.
- Title A-Z sort doğru çalışıyor.
- Total snippet count doğru.
- Favorite snippet count doğru.
- Most used language doğru.
- Invalid storage fallback çalışıyor.
- Valid import data kabul ediliyor.

Komutlar:

```bash
npm run build
npm test
```

Commit:

```bash
git add .
git commit -m "test: add snippet manager utility tests"
```

---

### Phase 15 — README ve GitHub Hazırlığı

Kullanılacak agent:

```txt
docs-github-agent
```

Yapılacaklar:

1. README.md oluştur.
2. Projeyi açıkla.
3. Özellikleri listele.
4. Kurulum adımlarını yaz.
5. Kullanım rehberi ekle.
6. Screenshot placeholder ekle.
7. Future improvements yaz.
8. GitHub açıklaması ve topics öner.

README başlıkları:

```md
# SnippetShelf

A simple React + TypeScript personal code snippet manager.

## Features

## Tech Stack

## Getting Started

## Usage

## Project Structure

## Screenshots

## Future Improvements

## Author

## License
```

GitHub repo açıklaması:

```txt
A simple React + TypeScript code snippet manager with search, filters, favorites, copy-to-clipboard, localStorage persistence, and JSON import/export.
```

GitHub topics:

```txt
react
typescript
vite
code-snippets
snippet-manager
localstorage
student-project
portfolio
```

Commit:

```bash
git add .
git commit -m "docs: prepare snippetshelf for GitHub"
```

---

## 10. Antigravity Kullanım Akışı

### 10.1 Workspace

1. Antigravity aç.
2. Yeni workspace olarak `snippetshelf` klasörünü seç.
3. Agent ayarlarında güvenli mod tercih et:
   - Terminal commands: Request Review
   - Review policy: Request Review veya Agent Decides
   - Browser JS execution: Request Review
   - Terminal Sandbox: Açık

### 10.2 İlk Görev

Antigravity agent’a şu prompt’u ver:

```txt
Read PROJECT_BRIEF.md. Create the required .claude/agents files first. Then follow the project phases in order. Start with Phase 0 and stop after the first successful build so I can review.
```

### 10.3 Phase Phase İlerleme

Her phase için ayrı görev aç:

```txt
Continue with Phase 6 from PROJECT_BRIEF.md. Use the correct subagent. Implement only this phase, run build, and summarize changed files.
```

### 10.4 Browser ile Test

UI bittikten sonra Antigravity Browser’a şu test akışını yaptır:

```txt
Open the local Vite app in the browser and test this main flow:
1. View sample snippet cards.
2. Add a new snippet.
3. Search for the new snippet.
4. Filter by language.
5. Filter by favorite snippets.
6. Sort by title A-Z.
7. Open snippet detail modal.
8. Copy code to clipboard.
9. Edit a snippet.
10. Delete a snippet.
11. Refresh the page.
12. Confirm data is still there.
13. Export data.
14. Try importing invalid JSON and confirm the app shows an error.

Create an artifact with screenshots and a short QA summary.
```

---

## 11. Claude Code Kullanım Akışı

Terminal içinde önerilen akış:

```bash
cd snippetshelf
claude
```

İlk prompt:

```txt
Read PROJECT_BRIEF.md carefully. Create the custom subagents in .claude/agents. Then start from Phase 0 and proceed phase by phase. After each phase, run build or tests where relevant and ask for review before continuing.
```

Belirli agent çağırma örnekleri:

```txt
Use the data-modeler agent to create the CodeSnippet types and at least 10 sample snippet records.
```

```txt
Use the feature-builder agent to implement search, filter, sort, and empty state behavior for the snippet list.
```

```txt
Use the clipboard-agent to implement copy-to-clipboard behavior for snippet cards and the detail modal.
```

```txt
Use the qa-tester agent to run npm run build and npm test, fix any failures, and create a short QA report.
```

```txt
Use the docs-github-agent to create a beginner-friendly README and GitHub publishing checklist.
```

---

## 12. Güvenlik ve Kontrol Kuralları

Agent’lar şu kurallara uymalı:

- Sadece proje klasörü içinde çalış.
- Başka repo veya sistem klasörlerine dokunma.
- Şu komutları izinsiz kullanma:

```bash
rm -rf
del /s
rmdir /s
git reset --hard
git clean -fd
```

- Yeni dependency eklemeden önce neden gerektiğini açıkla.
- Secret, token veya API key isteme.
- Kullanıcının kod snippetlerini herhangi bir yere gönderme.
- Kullanıcı kodunu uygulama içinde çalıştırma.
- Büyük refactor öncesi çalışan hali commit’le.
- Her phase sonunda şunları özetle:
  - Ne yapıldı?
  - Hangi dosyalar değişti?
  - Build/test sonucu ne?
  - Sıradaki phase ne?

---

## 13. Definition of Done

Proje bitmiş sayılması için:

- Uygulama açılıyor.
- Sample snippet kayıtları görünüyor.
- Yeni snippet eklenebiliyor.
- Snippet düzenlenebiliyor.
- Snippet silinebiliyor.
- Snippet favoriye eklenebiliyor.
- Kodu kopyalama çalışıyor.
- Search çalışıyor.
- Filter çalışıyor.
- Sort çalışıyor.
- Detail modal çalışıyor.
- Dashboard gerçek verilerle güncelleniyor.
- LocalStorage çalışıyor.
- Export/import çalışıyor.
- Build başarılı.
- Testler başarılı.
- README hazır.
- GitHub’a yüklenecek hale gelmiş.

Kontrol komutları:

```bash
npm run build
npm test
```

Beklenen sonuç:

```txt
No TypeScript errors.
No failing tests.
Production build generated successfully.
```

---

## 14. GitHub’a Yükleme Adımları

```bash
git status
git add .
git commit -m "chore: finalize snippetshelf"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Not:

- `YOUR_REPOSITORY_URL` kısmını kendi GitHub repo linkinle değiştir.
- README içindeki author kısmını kendi adına göre düzenle.
- Screenshot eklemek için `public/screenshots/` klasörü oluşturabilirsin.

---

## 15. README Screenshot Checklist

GitHub’a atmadan önce şu ekran görüntülerini al:

- Dashboard
- Snippet listesi
- Snippet ekleme formu
- Search/filter kullanılmış hali
- Snippet detail modal
- Copy success feedback
- Export/import paneli
- Mobile görünüm

README içinde örnek:

```md
## Screenshots

### Dashboard

![Dashboard](public/screenshots/dashboard.png)

### Snippet Detail

![Snippet Detail](public/screenshots/snippet-detail.png)
```

---

## 16. Future Improvements

İlk sürüm bittikten sonra eklenebilecek ama şu an zorunlu olmayan özellikler:

- Dark mode
- Syntax highlighting
- Markdown notes
- CSV export
- GitHub Pages deploy
- PWA offline support
- Mock API version
- Folder/category sistemi
- Pin snippets
- Keyboard shortcuts
- Snippet duplicate detection

---

## 17. Son Kontrol Prompt’u

Proje bittiğinde Claude Code / Antigravity’ye şu prompt ver:

```txt
Review the entire project as if it will be published on GitHub.

Check:
1. Does npm run build pass?
2. Do tests pass?
3. Is README clear?
4. Are there unused files?
5. Are there unnecessary dependencies?
6. Is the UI understandable?
7. Does search/filter/sort work correctly?
8. Does copy-to-clipboard work?
9. Does localStorage work after refresh?
10. Are there console errors?
11. Is the project suitable for a beginner portfolio?

Fix small issues only. Do not add new major features.
Create a final summary.
```

---

## 18. Tavsiye Edilen Çalışma Şekli

Bu projeyi tek seferde yaptırmak yerine phase phase yaptır.

En iyi sıra:

```txt
1. Setup
2. Requirements
3. Data model
4. Architecture
5. Snippet listing
6. Snippet creation
7. Search/filter/sort
8. Favorite/edit/delete
9. Detail modal
10. Clipboard copy
11. Dashboard
12. LocalStorage
13. Import/export
14. UI polish
15. Tests
16. README
17. GitHub publish
```

Böyle yaparsan agent çıktıları daha kontrollü olur ve hata ayıklamak kolaylaşır.

---

## 19. Kısa Özet

Bu proje küçük ama GitHub için düzgün görünen bir portfolyo projesidir.

Öğreneceğin şeyler:

- React component yapısı
- TypeScript type/interface kullanımı
- Controlled form mantığı
- Search/filter/sort algoritması
- Modal yönetimi
- Clipboard API kullanımı
- LocalStorage persistence
- JSON import/export
- Utility testleri
- README hazırlama
- GitHub repo düzeni
- Claude Code subagent kullanımı
- Antigravity Browser ile UI doğrulama

Final hedef:

```txt
Temiz çalışan, README’si düzgün, GitHub’a konulabilir bir SnippetShelf code snippet manager uygulaması.
```
