# Icons Structure - Best Practices

## 🎯 Overview

Struktur ikon ini telah dioptimasi untuk memberikan pengalaman developer yang lebih clean dan maintainable. Berikut adalah pendekatan yang digunakan:

## 📁 Structure

```
icons/
├── icons.ts          # Centralized icon management (NEW)
├── index.tsx         # Barrel export dengan backward compatibility
├── iconWithClassName.ts # Utility untuk NativeWind support
└── README.md         # Documentation
```

## ✨ Benefits

### 1. **Centralized Management**
- Semua ikon dikelola dalam satu file (`icons.ts`)
- Mudah untuk menambah/menghapus ikon
- Konsistensi naming convention

### 2. **Reduced Boilerplate**
- Tidak perlu membuat file terpisah untuk setiap ikon
- Otomatis apply `iconWithClassName` ke semua ikon
- Grouping berdasarkan kategori untuk kemudahan

### 3. **Type Safety**
- Export `IconName` type untuk autocomplete
- Helper function `getIcon()` dengan type safety

### 4. **Backward Compatibility**
- Import yang sudah ada tetap berfungsi
- Gradual migration tanpa breaking changes

## 🚀 Usage

### Basic Import
```tsx
// Recommended - Import specific icons
import { UserIcon, BellIcon, SettingsIcon } from '@/components/ui/icons';

// Alternative - Import all icons
import icons, { IconName, getIcon } from '@/components/ui/icons';
```

### Dynamic Icon Usage
```tsx
import { getIcon, IconName } from '@/components/ui/icons';

const DynamicIcon = ({ name }: { name: IconName }) => {
  const Icon = getIcon(name);
  return <Icon className="w-6 h-6" />;
};
```

### Adding New Icons

1. **Add to imports** in `icons.ts`:
```tsx
import {
  // ... existing imports
  NewIcon,
} from "lucide-react-native";
```

2. **Add to icons object**:
```tsx
const icons = {
  // ... existing icons
  NewIcon,
};
```

3. **Add to exports**:
```tsx
export const {
  // ... existing exports
  NewIcon: NewIconIcon,
} = icons;
```

## 🔄 Migration Guide

### From Old Structure
```tsx
// Old way (masih berfungsi)
import { UserIcon } from '@/components/ui/icons/UserIcon';

// New way (recommended)
import { UserIcon } from '@/components/ui/icons';
```

### Cleanup Old Files
Setelah yakin semua import sudah menggunakan cara baru, file-file individual ikon bisa dihapus:
- `UserIcon.tsx`
- `BellIcon.tsx`
- dll.

## 📝 Best Practices

1. **Consistent Naming**: Gunakan format `[Name]Icon` untuk semua ikon
2. **Categorization**: Group ikon berdasarkan fungsi/kategori
3. **Documentation**: Tambahkan comment untuk kategori baru
4. **Type Safety**: Selalu gunakan `IconName` type untuk dynamic usage

## 🎨 Icon Categories

- **Auth**: LogIn, Eye, EyeOff
- **UI**: Bell, Search, SlidersHorizontal
- **Theme**: Sun, MoonStar
- **Navigation**: ArrowLeft, ArrowRight
- **User & Profile**: User, UserPlus
- **Communication**: Mail
- **Status & Feedback**: AlertCircle, CheckCircle, HelpCircle
- **Action**: RefreshCcw, Settings, CreditCard
- **Time & Calendar**: Calendar, Clock
- **Data & Analytics**: TrendingUp, Star

## 🔧 Maintenance

- Untuk menambah ikon baru, edit hanya file `icons.ts`
- Untuk menghapus ikon, hapus dari `icons.ts` dan update exports
- Untuk rename, update di bagian exports dengan alias

Struktur ini memberikan balance antara simplicity, maintainability, dan backward compatibility! 🚀